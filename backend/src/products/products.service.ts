import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dtos/create.product.dto';
import { GetProductsDto } from './dtos/get.products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProducts(query: GetProductsDto): Promise<ProductDocument[]> {
    const filter: any = {};

    if (query.minPrice) {
      filter.price = { ...filter.price, $gte: +query.minPrice };
    }

    if (query.maxPrice) {
      filter.price = { ...filter.price, $lte: +query.maxPrice };
    }

    if (query.search) {
      filter.name = new RegExp(query.search, 'i');
    }

    if (query.minRating) {
      filter.rating = { $gte: +query.minRating };
    }

    let sort = {};
    if (query.sortField) {
      sort = {
        [query.sortField.replace('-', '')]: query.sortField.startsWith('-')
          ? 1
          : -1,
      };
    }

    const limit = query.limit ? +query.limit : 10;
    const page = query.page ? +query.page : 1;
    const skip = (page - 1) * limit;

    return await this.productModel
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();

    // Add proper pagination
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductDocument> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async toggleProductWatch(id: string): Promise<ProductDocument> {
    const foundProduct = await this.productModel.findOne({ _id: id });
    if (!foundProduct) {
      throw new NotFoundException({
        description: 'Product not found',
      });
    }
    foundProduct.isWatched = !foundProduct.isWatched;
    return foundProduct.save();
  }

  async seed(): Promise<void> {
    for (let i = 0; i < 10; i++) {
      const randomRating = Math.floor(Math.random() * 5) + 1;
      const product = new this.productModel({
        name: `Product ${i}`,
        description: `Description ${i}`,
        price: i * 10,
        rating: randomRating,
      });
      product.save().catch(console.error);
    }
  }
}
