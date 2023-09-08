import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(
      'mongodb://developer:password@localhost:27017/?authMechanism=DEFAULT',
    ),
  ],
})
export class AppModule {}
