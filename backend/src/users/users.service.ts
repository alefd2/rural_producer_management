import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prismaService.users.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prismaService.users.findMany();
  }

  findOne(id: string) {
    return this.prismaService.users.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByName(userName: string) {
    return await this.prismaService.users.findFirst({
      where: {
        name: userName,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.users.update({
      data: updateUserDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.users.delete({
      where: { id },
    });
  }
}
