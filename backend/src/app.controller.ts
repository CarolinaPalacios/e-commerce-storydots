import { Controller, Post } from '@nestjs/common';
import { DataLoaderService } from './utils/data-loader.service';

@Controller('data')
export class AppController {
  constructor(private readonly dataLoaderService: DataLoaderService) {}

  @Post('load')
  async loadData() {
    await this.dataLoaderService.loadProductsFromJson('src/utils/data.json');
  }
}
