import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 1 })
  rating: number;

  @Prop({ required: true })
  price: number;

  @Prop({ default: false })
  isWatched: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
