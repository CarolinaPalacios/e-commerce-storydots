import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsNotEmpty()
  brand_id: string;
}
