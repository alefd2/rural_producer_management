import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('producers')
export class ProducersController {
  constructor(private readonly producersService: ProducersService) {}

  @Post()
  async create(@Body() createProducerDto: CreateProducerDto) {
    return await this.producersService.create(createProducerDto);
  }

  @Get()
  async findAll() {
    return await this.producersService.findAll();
  }

  @Get()
  async findAllByUserId(@Param('id') id: string) {
    return await this.producersService.findAllByUserId(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.producersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProducerDto: UpdateProducerDto,
  ) {
    return await this.producersService.update(id, updateProducerDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.producersService.remove(id);
  }
}
