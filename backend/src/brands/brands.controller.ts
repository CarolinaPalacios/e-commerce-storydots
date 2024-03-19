import { Controller, HttpStatus, Logger, Param } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contracts } from '../lib/api-client';
import { BrandsService } from './brands.service';

@Controller()
export class BrandsController {
  private readonly logger = new Logger(BrandsController.name);

  constructor(private readonly brandsService: BrandsService) {}

  @TsRestHandler(contracts.brand.getAllBrands)
  public async getAllBrands() {
    return tsRestHandler(contracts.brand.getAllBrands, async () => {
      try {
        const brands = await this.brandsService.getAllBrands();
        return {
          status: HttpStatus.OK,
          body: { brands },
        };
      } catch (error) {
        this.logger.error(`Error at /brands: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: error.message,
          },
        };
      }
    });
  }

  @TsRestHandler(contracts.brand.getProductsByBrand)
  public async getProductsByBrand(@Param('id') id: string) {
    return tsRestHandler(contracts.brand.getProductsByBrand, async () => {
      try {
        const products = await this.brandsService.getProductsByBrand(id);
        return {
          status: HttpStatus.OK,
          body: { products },
        };
      } catch (error) {
        this.logger.error(`Error at /brands/${id}: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: error.message,
          },
        };
      }
    });
  }
}
