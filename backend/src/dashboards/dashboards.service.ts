import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDashboardData() {
    const totalFarms = await this.findTotalFarms();
    const totalAreaInHectares = await this.findTotalAreaInHectares();
    const farmsByState = await this.findFarmsByState();
    const farmsByCrops = await this.findFarmsByCrops();
    const landUse = await this.findLandUse();

    return {
      totalFarms,
      totalAreaInHectares,
      farmsByState,
      farmsByCrops,
      landUse,
    };
  }

  async findTotalFarms() {
    return await this.prismaService.ruralProducers.count();
  }

  async findTotalAreaInHectares() {
    const totalArea = await this.prismaService.ruralProducers.aggregate({
      _sum: { areaInHectares: true },
    });
    return totalArea._sum.areaInHectares;
  }

  async findFarmsByState() {
    const farmsByState = await this.prismaService.ruralProducers.groupBy({
      by: ['state'],
      _count: { state: true },
    });
    return farmsByState.map((stateGroup) => ({
      state: stateGroup.state,
      count: stateGroup._count.state,
    }));
  }

  async findFarmsByCrops() {
    const farms = await this.prismaService.ruralProducers.findMany({
      select: { plantedCrops: true },
    });

    const cropCount = {};

    farms.forEach((farm) => {
      farm.plantedCrops.forEach((crop) => {
        cropCount[crop] = (cropCount[crop] || 0) + 1;
      });
    });

    return Object.entries(cropCount).map(([crop, count]) => ({
      crop,
      count,
    }));
  }

  async findLandUse() {
    const landUse = await this.prismaService.ruralProducers.aggregate({
      _sum: {
        arableAreaInHectares: true,
        vegetationAreaInHectares: true,
      },
    });

    return {
      arableAreaInHectares: landUse._sum.arableAreaInHectares,
      vegetationAreaInHectares: landUse._sum.vegetationAreaInHectares,
    };
  }
}
