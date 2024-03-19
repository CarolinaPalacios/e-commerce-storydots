import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { admin } from '../config/firebase-admin.config';

export type ReqWithUser = Request & {
  user: { email: string; id: string };
  token: string;
};

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<ReqWithUser>();
    const sessionCookie = request.cookies.session as string | undefined | null;

    if (!sessionCookie) return false;

    try {
      const decodedClaims = await admin
        .auth()
        .verifySessionCookie(sessionCookie, true);
      if (!decodedClaims.email) return false;

      request.user = {
        email: decodedClaims.email,
        id: decodedClaims.dbUserId,
      };

      return true;
    } catch (error) {
      return false;
    }
  }
}
