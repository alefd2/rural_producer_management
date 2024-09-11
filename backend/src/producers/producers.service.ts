import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProducersService {
  constructor(private readonly prismaService: PrismaService) {}

  private validateAreas(
    totalArea: number,
    arableArea: number,
    vegetationArea: number,
  ) {
    if (arableArea + vegetationArea > totalArea) {
      return false;
    }

    return true;
  }

  async create(createProducerDto: CreateProducerDto) {
    const isNotAreaGreaterThanTotalFarm = this.validateAreas(
      createProducerDto.areaInHectares,
      createProducerDto.arableAreaInHectares,
      createProducerDto.vegetationAreaInHectares,
    );

    if (!isNotAreaGreaterThanTotalFarm) {
      throw new BadRequestException(
        'A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.',
      );
    }

    const userExists = await this.prismaService.users.findUnique({
      where: { id: createProducerDto.usersId },
    });

    if (!userExists) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return await this.prismaService.ruralProducers.create({
      data: createProducerDto,
    });
  }

  async findAll() {
    return await this.prismaService.ruralProducers.findMany();
  }

  async findAllByUserId(userId: string) {
    return await this.prismaService.ruralProducers.findMany({
      where: { usersId: userId },
    });
  }

  async findOne(id: string) {
    return this.prismaService.ruralProducers.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateProducerDto: UpdateProducerDto) {
    const isNotAreaGreaterThanTotalFarm = this.validateAreas(
      updateProducerDto.areaInHectares,
      updateProducerDto.arableAreaInHectares,
      updateProducerDto.vegetationAreaInHectares,
    );
    if (!isNotAreaGreaterThanTotalFarm) {
      throw new BadRequestException(
        'A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.',
      );
    }
    return this.prismaService.ruralProducers.update({
      data: updateProducerDto,
      where: { id },
    });
  }

  async remove(id: string) {
    return this.prismaService.ruralProducers.delete({
      where: { id },
    });
  }
}
