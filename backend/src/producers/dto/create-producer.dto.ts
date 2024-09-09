import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ArrayMinSize,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateProducerDto {
  @IsNotEmpty({ message: 'O documento é obrigatório.' })
  @IsString({ message: 'O documento deve ser uma string.' })
  @MaxLength(20, { message: 'O documento pode ter no máximo 20 caracteres.' })
  document: string;

  @IsNotEmpty({ message: 'O nome do produtor é obrigatório.' })
  @IsString({ message: 'O nome do produtor deve ser uma string.' })
  @MaxLength(100, {
    message: 'O nome do produtor pode ter no máximo 100 caracteres.',
  })
  producerName: string;

  @IsNotEmpty({ message: 'O nome da fazenda é obrigatório.' })
  @IsString({ message: 'O nome da fazenda deve ser uma string.' })
  @MaxLength(100, {
    message: 'O nome da fazenda pode ter no máximo 100 caracteres.',
  })
  farmNAme: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString({ message: 'A cidade deve ser uma string.' })
  @MaxLength(50, { message: 'A cidade pode ter no máximo 50 caracteres.' })
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString({ message: 'O estado deve ser uma string.' })
  @MaxLength(2, { message: 'O estado deve ter exatamente 2 caracteres.' })
  state: string;

  @IsNotEmpty({ message: 'A área total em hectares é obrigatória.' })
  @IsNumber({}, { message: 'A área total deve ser um número.' })
  @Min(0, { message: 'A área total deve ser maior ou igual a 0.' })
  areaInHectares: number;

  @IsNotEmpty({ message: 'A área agricultável em hectares é obrigatória.' })
  @IsNumber({}, { message: 'A área agricultável deve ser um número.' })
  @Min(0, { message: 'A área agricultável deve ser maior ou igual a 0.' })
  arableAreaInHectares: number;

  @IsNotEmpty({ message: 'A área de vegetação em hectares é obrigatória.' })
  @IsNumber({}, { message: 'A área de vegetação deve ser um número.' })
  @Min(0, { message: 'A área de vegetação deve ser maior ou igual a 0.' })
  vegetationAreaInHectares: number;

  @IsArray({ message: 'As culturas plantadas devem ser um array.' })
  @ArrayMinSize(1, { message: 'Deve haver pelo menos uma cultura plantada.' })
  @IsString({
    each: true,
    message: 'Cada cultura plantada deve ser uma string.',
  })
  plantedCrops: string[];

  @IsNotEmpty({ message: 'O ID do usuário é obrigatório.' })
  usersId: string;
}
