import { Injectable } from '@nestjs/common';
import { prisma } from '../prisma/prisma.module';
import * as fs from 'fs';

@Injectable()
export class DataLoaderService {
  async loadProductsFromJson(filePath: string): Promise<void> {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const jsonData = JSON.parse(data);

      for (const brandData of jsonData.brands) {
        const brand = await prisma.brand.create({
          data: {
            name: brandData.name,
            logo_url: brandData.logo_url,
          },
        });

        console.log(`Brand ${brand.name} created`);

        for (const productData of brandData.products) {
          await prisma.product.create({
            data: {
              name: productData.name,
              description: productData.description,
              image_url: productData.image_url,
              price: productData.price,
              brand: {
                connect: {
                  id: brand.id,
                },
              },
            },
          });

          console.log(`Product ${productData.name} created`);
        }
      }
    } catch (error) {
      console.error(`Error loading products from JSON: ${error}`);
    }
  }
}
