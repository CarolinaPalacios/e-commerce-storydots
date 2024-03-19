import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Product, contracts } from '../lib/api-client';
import { prisma } from '../prisma/prisma.module';
import { TsRestException } from '@ts-rest/nest';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  constructor() {}

  public formatProduct(product): Product {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image_url: product.image_url,
      price: product.price,
      brand_id: product.brand_id,
      brand: {
        id: product.brand_id,
        name: product.brand.name,
        logo_url: product.brand.logo_url,
        products: [],
      },
    };
  }

  public async getAllProducts(
    page: number = 1,
    pageSize: number = 12,
  ): Promise<{ products: Product[]; totalCount: number; totalPages: number }> {
    const parsedPage = Number(page);
    const parsedPageSize = Number(pageSize);
    const offset = (parsedPage - 1) * parsedPageSize;
    const products = await prisma.product.findMany({
      include: {
        brand: true,
      },
      skip: offset,
      take: parsedPageSize,
    });

    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / parsedPageSize);

    const formattedProducts: Product[] = products.map((product) =>
      this.formatProduct(product),
    );

    return { products: formattedProducts, totalCount, totalPages };
  }

  public async getProduct(id: string): Promise<Product> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
      },
    });

    if (!product)
      throw new TsRestException(contracts.product.getProduct, {
        status: HttpStatus.NOT_FOUND,
        body: {
          message: 'Product not found',
        },
      });

    const formattedProduct: Product = this.formatProduct(product);

    return formattedProduct;
  }

  public async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    const productFound = await prisma.product.findFirst({
      where: {
        name: createProductDto.name,
      },
    });

    if (productFound)
      throw new TsRestException(contracts.product.createProduct, {
        status: HttpStatus.CONFLICT,
        body: {
          message: 'Product already exists',
        },
      });

    const product = await prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        image_url: createProductDto.image_url,
        price: createProductDto.price,
        brand_id: createProductDto.brand_id,
      },
      include: {
        brand: true,
      },
    });

    const formattedProduct: Product = this.formatProduct(product);

    return formattedProduct;
  }

  public async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const parcedPrice = Number(updateProductDto.price);
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        image_url: updateProductDto.image_url,
        price: parcedPrice,
      },
      include: {
        brand: true,
      },
    });

    if (!product)
      throw new TsRestException(contracts.product.updateProduct, {
        status: HttpStatus.NOT_FOUND,
        body: {
          message: 'Product not found',
        },
      });

    const formattedProduct: Product = this.formatProduct(product);

    return formattedProduct;
  }

  public async deleteProduct(id: string): Promise<void> {
    const productToDelete = await prisma.product.delete({
      where: { id },
    });

    if (!productToDelete)
      throw new TsRestException(contracts.product.deleteProduct, {
        status: HttpStatus.NOT_FOUND,
        body: {
          message: 'Product not found',
        },
      });

    return;
  }

  public async deleteAllProducts(): Promise<void> {
    await prisma.product.deleteMany();
    return;
  }
}
