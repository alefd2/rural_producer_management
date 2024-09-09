import { Module } from '@nestjs/common';
import { ProducersService } from './producers.service';
import { ProducersController } from './producers.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProducersController],
  providers: [ProducersService, JwtService],
})
export class ProducersModule {}
