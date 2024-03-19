import { User, contracts } from '../lib/api-client';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { admin } from './config/firebase-admin.config';
import { Prisma, prisma } from '../prisma/prisma.module';
import { TsRestException } from '@ts-rest/nest';

const userSelect = {
  email: true,
  name: true,
  img: true,
  id: true,
} satisfies Prisma.UserSelect;

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor() {}

  public async verifyAndUpsertUser(accessToken: string): Promise<{
    decodedToken: DecodedIdToken;
    userInfo: User;
  }> {
    const decodedToken = await admin.auth().verifyIdToken(accessToken);

    const userInfo = await prisma.user.upsert({
      where: { email: decodedToken.email },
      create: {
        email: decodedToken.email,
        name: decodedToken.name,
        img: decodedToken.picture,
      },
      update: {
        name: decodedToken.name,
        img: decodedToken.picture,
      },
      select: userSelect,
    });

    await admin.auth().setCustomUserClaims(decodedToken.uid, {
      dbUserId: userInfo.id,
    });

    return { decodedToken, userInfo };
  }

  public async createSessionCookie(
    accessToken: string,
  ): Promise<{ sessionCookie: string; expiresIn: number }> {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(accessToken, {
      expiresIn,
    });

    return { sessionCookie, expiresIn };
  }

  public async getUserInfo(email: string): Promise<User> {
    const userInfo = await prisma.user.findUnique({
      where: { email },
      select: userSelect,
    });

    if (!userInfo) {
      throw new TsRestException(contracts.auth.me, {
        status: HttpStatus.NOT_FOUND,
        body: {
          message: 'User not found',
        },
      });
    }
    return userInfo;
  }

  public async revokeToken(sessionCookie: string): Promise<void> {
    try {
      const decodedClaims = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);
      await admin.auth().revokeRefreshTokens(decodedClaims.sub);
    } catch (error) {
      if (error instanceof Error) {
        throw new TsRestException(contracts.auth.logout, {
          status: HttpStatus.UNAUTHORIZED,
          body: {
            message: `You're not authorized to access this resource: ${error.message}`,
          },
        });
      }
      this.logger.error(`Error revoking token: ${error}`);
      throw new TsRestException(contracts.auth.logout, {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          message: `Error revoking token: ${error.message}`,
        },
      });
    }
  }
}
