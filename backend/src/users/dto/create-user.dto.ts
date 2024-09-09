import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @MaxLength(100, { message: 'O nome pode ter no máximo 100 caracteres.' })
  name: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @MaxLength(20, { message: 'A senha pode ter no máximo 20 caracteres.' })
  password: string;

  @IsBoolean({ message: 'O campo ativo deve ser um valor booleano.' })
  active: boolean;
}
