import { Test, TestingModule } from '@nestjs/testing';
import { DashboardsService } from './dashboards.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DashboardsService', () => {
  let service: DashboardsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardsService,
        {
          provide: PrismaService,
          useValue: {
            ruralProducers: {
              count: jest.fn(),
              aggregate: jest.fn(),
              groupBy: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DashboardsService>(DashboardsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardData', () => {
    it('should return dashboard data', async () => {
      const result = {
        totalFarms: 10,
        totalAreaInHectares: 1000.5,
        farmsByState: [{ state: 'SP', count: 5 }],
        farmsByCrops: [{ crop: 'Soja', count: 3 }],
        landUse: { arableAreaInHectares: 500, vegetationAreaInHectares: 300 },
      };

      jest
        .spyOn(service, 'findTotalFarms')
        .mockResolvedValue(result.totalFarms);
      jest
        .spyOn(service, 'findTotalAreaInHectares')
        .mockResolvedValue(result.totalAreaInHectares);
      jest
        .spyOn(service, 'findFarmsByState')
        .mockResolvedValue(result.farmsByState);
      jest
        .spyOn(service, 'findFarmsByCrops')
        .mockResolvedValue(result.farmsByCrops);
      jest.spyOn(service, 'findLandUse').mockResolvedValue(result.landUse);

      expect(await service.getDashboardData()).toBe(result);
      expect(service.findTotalFarms).toHaveBeenCalled();
      expect(service.findTotalAreaInHectares).toHaveBeenCalled();
      expect(service.findFarmsByState).toHaveBeenCalled();
      expect(service.findFarmsByCrops).toHaveBeenCalled();
      expect(service.findLandUse).toHaveBeenCalled();
    });
  });

  describe('findTotalFarms', () => {
    it('should return total number of farms', async () => {
      const result = 10;
      jest
        .spyOn(prismaService.ruralProducers, 'count')
        .mockResolvedValue(result);

      expect(await service.findTotalFarms()).toBe(result);
      expect(prismaService.ruralProducers.count).toHaveBeenCalled();
    });
  });

  describe('findTotalAreaInHectares', () => {
    it('should return total area in hectares', async () => {
      //TODO: ajustar posteriormente
      const result = {
        _count: { areaInHectares: 0 },
        _avg: { areaInHectares: null },
        _sum: { areaInHectares: 1000.5 },
        _min: { areaInHectares: null },
        _max: { areaInHectares: null },
      };

      jest
        .spyOn(prismaService.ruralProducers, 'aggregate')
        .mockResolvedValue(result);

      expect(await service.findTotalAreaInHectares()).toBe(
        result._sum.areaInHectares,
      );
      expect(prismaService.ruralProducers.aggregate).toHaveBeenCalled();
    });
  });

  describe('findFarmsByState', () => {
    it('should return farms grouped by state', async () => {
      const result = [
        {
          state: 'SP',
          _count: { state: 5 },
        },
      ] as any;

      jest
        .spyOn(prismaService.ruralProducers, 'aggregate')
        .mockResolvedValue(result);

      expect(await service.findFarmsByState()).toEqual([
        { state: 'SP', count: 5 },
      ]);

      expect(prismaService.ruralProducers.aggregate).toHaveBeenCalled();
    });
  });

  describe('findFarmsByCrops', () => {
    it('should return farms grouped by crops', async () => {
      const farms = [
        {
          id: '1',
          document: '123',
          producerName: 'Producer 1',
          farmNAme: 'Farm 1',
          city: 'City 1',
          state: 'State 1',
          areaInHectares: 10,
          arableAreaInHectares: 5,
          vegetationAreaInHectares: 5,
          plantedCrops: ['Soja', 'Milho'],
          createdAt: new Date(),
          updatedAt: new Date(),
          usersId: 'user1',
        },
        {
          id: '2',
          document: '456',
          producerName: 'Producer 2',
          farmNAme: 'Farm 2',
          city: 'City 2',
          state: 'State 2',
          areaInHectares: 20,
          arableAreaInHectares: 10,
          vegetationAreaInHectares: 10,
          plantedCrops: ['Soja'],
          createdAt: new Date(),
          updatedAt: new Date(),
          usersId: 'user2',
        },
        {
          id: '3',
          document: '789',
          producerName: 'Producer 3',
          farmNAme: 'Farm 3',
          city: 'City 3',
          state: 'State 3',
          areaInHectares: 30,
          arableAreaInHectares: 15,
          vegetationAreaInHectares: 15,
          plantedCrops: ['Milho'],
          createdAt: new Date(),
          updatedAt: new Date(),
          usersId: 'user3',
        },
      ];

      jest
        .spyOn(prismaService.ruralProducers, 'findMany')
        .mockResolvedValue(farms);

      const result = [
        { crop: 'Soja', count: 2 },
        { crop: 'Milho', count: 2 },
      ];

      expect(await service.findFarmsByCrops()).toEqual(result);
      expect(prismaService.ruralProducers.findMany).toHaveBeenCalled();
    });
  });

  describe('findLandUse', () => {
    it('should return land use data', async () => {
      const result = {
        _sum: {
          arableAreaInHectares: 500,
          vegetationAreaInHectares: 300,
        },
        _count: {},
        _avg: {},
        _min: {},
        _max: {},
      };

      jest
        .spyOn(prismaService.ruralProducers, 'aggregate')
        .mockResolvedValue(result);

      expect(await service.findLandUse()).toEqual({
        arableAreaInHectares: result._sum.arableAreaInHectares,
        vegetationAreaInHectares: result._sum.vegetationAreaInHectares,
      });
      expect(prismaService.ruralProducers.aggregate).toHaveBeenCalled();
    });
  });
});
