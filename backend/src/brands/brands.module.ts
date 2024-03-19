import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { ProductsService } from '../products/products.service';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService, ProductsService],
})
export class BrandsModule {}
