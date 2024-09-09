import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
  @IsString({ message: 'O nome de usuário deve ser uma string.' })
  @MaxLength(50, {
    message: 'O nome de usuário pode ter no máximo 50 caracteres.',
  })
  userName: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  @MaxLength(20, { message: 'A senha pode ter no máximo 20 caracteres.' })
  password: string;
}
