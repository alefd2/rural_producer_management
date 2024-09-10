import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardsService } from './dashboards.service';

@UseGuards(AuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboarService: DashboardsService) {}

  // Chamada geral
  @Get('data')
  async getDashboardData() {
    return await this.dashboarService.getDashboardData();
  }

  // total de fazendas
  @Get('total-farms')
  async getTotalFarms() {
    return await this.dashboarService.findTotalFarms();
  }

  // área total em hectares
  @Get('total-area')
  async getTotalAreaInHectares() {
    return await this.dashboarService.findTotalAreaInHectares();
  }

  // distribuição de fazendas por estado
  @Get('farms-by-state')
  async getFarmsByState() {
    return await this.dashboarService.findFarmsByState();
  }

  // distribuição de fazendas por cultura
  @Get('farms-by-crops')
  async getFarmsByCrops() {
    return await this.dashboarService.findFarmsByCrops();
  }

  // Chamada individual (área agricultável e vegetação)
  @Get('land-use')
  async getLandUse() {
    return await this.dashboarService.findLandUse();
  }

  @Get('crop-ranking')
  async getRanking() {
    return await this.dashboarService.getCropsRanking();
  }
}
