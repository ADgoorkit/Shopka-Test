import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create.product.dto';
import { ProductDocument } from './schemas/product.schema';
import { GetProductsDto } from './dtos/get.products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  async getProducts(
    @Query() query: GetProductsDto,
  ): Promise<Array<ProductDocument>> {
    return this.productsService.getProducts(query);
  }

  @Patch(':id')
  async toggleProductWatch(@Param('id') id: string): Promise<ProductDocument> {
    return this.productsService.toggleProductWatch(id);
  }

  @Get('seed')
  async seedProducts(): Promise<void> {
    return this.productsService.seed();
  }
}
