import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { DataLoaderService } from './utils/data-loader.service';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    BrandsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [DataLoaderService],
})
export class AppModule {}
