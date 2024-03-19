import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Brand, Product, contracts } from '../lib/api-client';
import { prisma } from '../prisma/prisma.module';
import { TsRestException } from '@ts-rest/nest';
import { ProductsService } from '../products/products.service';

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);
  constructor(private readonly productsService: ProductsService) {}

  private formatBrand(brand): Brand {
    return {
      id: brand.id,
      name: brand.name,
      logo_url: brand.logo_url,
      products: [],
    };
  }

  public async getAllBrands(): Promise<Brand[]> {
    const brands = await prisma.brand.findMany();
    return brands.map(this.formatBrand);
  }

  public async getProductsByBrand(id: string): Promise<Product[]> {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (!brand)
      throw new TsRestException(contracts.brand.getProductsByBrand, {
        status: HttpStatus.NOT_FOUND,
        body: {
          message: 'Brand not found',
        },
      });

    const products = await prisma.product.findMany({
      where: { brand_id: brand.id },
      include: {
        brand: true,
      },
    });

    const formattedProducts: Product[] = products.map((product) =>
      this.productsService.formatProduct(product),
    );

    return formattedProducts;
  }
}
