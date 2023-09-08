import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
  @ApiProperty()
  @IsString()
  @IsIn(['price', '-price', 'rating'])
  @IsOptional()
  sortField: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  minPrice: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  maxPrice: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  minRating: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  limit: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  page: string;
}
