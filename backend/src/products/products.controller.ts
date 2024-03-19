import {
  Controller,
  HttpStatus,
  Logger,
  Param,
  // UseGuards,
  Body,
  Query,
  // Delete,
} from '@nestjs/common';
import { TsRestException, TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contracts } from '../lib/api-client';
// import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(private readonly productsService: ProductsService) {}

  @TsRestHandler(contracts.product.getAllProducts)
  public async getAllProducts(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return tsRestHandler(contracts.product.getAllProducts, async () => {
      try {
        const { products, totalCount, totalPages } =
          await this.productsService.getAllProducts(page, pageSize);
        return {
          status: HttpStatus.OK,
          body: { products, count: totalCount, pages: totalPages },
        };
      } catch (error) {
        if (error instanceof TsRestException) throw error;
        this.logger.error(`Error at /products: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: error.message,
          },
        };
      }
    });
  }

  @TsRestHandler(contracts.product.getProduct)
  public async getProduct(@Param('id') id: string) {
    return tsRestHandler(contracts.product.getProduct, async () => {
      try {
        const product = await this.productsService.getProduct(id);
        return {
          status: HttpStatus.OK,
          body: product,
        };
      } catch (error) {
        if (error instanceof TsRestException) throw error;
        this.logger.error(`Error at /products: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: error.message,
          },
        };
      }
    });
  }

  @TsRestHandler(contracts.product.createProduct)
  // @UseGuards(FirebaseAuthGuard)
  public async createProduct(@Body() createProductDto: CreateProductDto) {
    return tsRestHandler(contracts.product.createProduct, async () => {
      try {
        const product =
          await this.productsService.createProduct(createProductDto);
        return {
          status: HttpStatus.CREATED,
          body: product,
        };
      } catch (error) {
        if (error instanceof TsRestException) throw error;
        this.logger.error(`Error at /products: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: error.message,
          },
        };
      }
    });
  }

  @TsRestHandler(contracts.product.updateProduct)
  // @UseGuards(FirebaseAuthGuard)
  public async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return tsRestHandler(contracts.product.updateProduct, async () => {
      try {
        const product = await this.productsService.updateProduct(
          id,
          updateProductDto,
        );
        return {
          status: HttpStatus.OK,
          body: product,
        };
      } catch (error) {
        if (error instanceof TsRestException) throw error;
        this.logger.error(`Error at /products: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: error.message,
          },
        };
      }
    });
  }

  @TsRestHandler(contracts.product.deleteProduct)
  // @UseGuards(FirebaseAuthGuard)
  public async deleteProduct(@Param('id') id: string) {
    return tsRestHandler(contracts.product.deleteProduct, async () => {
      try {
        await this.productsService.deleteProduct(id);
        return {
          status: HttpStatus.NO_CONTENT,
          body: null,
        };
      } catch (error) {
        if (error instanceof TsRestException) throw error;
        this.logger.error(`Error at /products: ${error}`);
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            message: error.message,
          },
        };
      }
    });
  }

  // @Delete('/products')
  // public async deleteAllProducts() {
  //   await this.productsService.deleteAllProducts();
  // }
}
