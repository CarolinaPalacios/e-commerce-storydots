import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  image_url: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  price: number;
}
