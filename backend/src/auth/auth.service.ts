import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthResponseDto } from './dto/response-auth.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  private jwtExpirationTime: number;

  async signIn(createAuthDto: CreateAuthDto): Promise<AuthResponseDto> {
    const foundUser = await this.usersService.findOneByName(
      createAuthDto.userName,
    );

    const validPass = () => {
      if (createAuthDto.password === foundUser?.password) return true;
      return false;
    };

    if (!foundUser || !validPass()) {
      throw new UnauthorizedException(
        'Credenciais inválidas. Verifique seu nome de usuário e senha.',
      );
    }

    const payload = {
      sub: foundUser.id,
      userName: foundUser.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      expiresIn: this.jwtExpirationTime,
    };
  }
}
