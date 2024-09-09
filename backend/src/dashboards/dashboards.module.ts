import { Module } from '@nestjs/common';
import { DashboardsService } from './dashboards.service';
import { DashboardController } from './dashboards.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [DashboardController],
  providers: [DashboardsService, JwtService],
})
export class DashboardsModule {}
