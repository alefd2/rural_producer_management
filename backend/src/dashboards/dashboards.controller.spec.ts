import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboards.controller';
import { DashboardsService } from './dashboards.service';

describe('DashboardController', () => {
  let controller: DashboardController;
  let service: DashboardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        {
          provide: DashboardsService,
          useValue: {
            getDashboardData: jest.fn(),
            findTotalFarms: jest.fn(),
            findTotalAreaInHectares: jest.fn(),
            findFarmsByState: jest.fn(),
            findFarmsByCrops: jest.fn(),
            findLandUse: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
    service = module.get<DashboardsService>(DashboardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getDashboardData method and return correct data', async () => {
    const result = {
      totalFarms: 10,
      totalAreaInHectares: 1000.5,
      farmsByState: [{ state: 'SP', count: 5 }],
      farmsByCrops: [{ crop: 'Soja', count: 3 }],
      landUse: { arableAreaInHectares: 500, vegetationAreaInHectares: 300 },
    };
    jest.spyOn(service, 'getDashboardData').mockResolvedValue(result);

    expect(await controller.getDashboardData()).toBe(result);
    expect(service.getDashboardData).toHaveBeenCalled();
  });

  it('should call getTotalFarms method and return total farms', async () => {
    const result = 10;
    jest.spyOn(service, 'findTotalFarms').mockResolvedValue(result);

    expect(await controller.getTotalFarms()).toBe(result);
    expect(service.findTotalFarms).toHaveBeenCalled();
  });

  it('should call getTotalAreaInHectares method and return total area', async () => {
    const result = 1000.5;
    jest.spyOn(service, 'findTotalAreaInHectares').mockResolvedValue(result);

    expect(await controller.getTotalAreaInHectares()).toBe(result);
    expect(service.findTotalAreaInHectares).toHaveBeenCalled();
  });

  it('should call getFarmsByState method and return farms by state', async () => {
    const result = [{ state: 'SP', count: 5 }];
    jest.spyOn(service, 'findFarmsByState').mockResolvedValue(result);

    expect(await controller.getFarmsByState()).toBe(result);
    expect(service.findFarmsByState).toHaveBeenCalled();
  });

  it('should call getFarmsByCrops method and return farms by crops', async () => {
    const result = [{ crop: 'Soja', count: 3 }];
    jest.spyOn(service, 'findFarmsByCrops').mockResolvedValue(result);

    expect(await controller.getFarmsByCrops()).toBe(result);
    expect(service.findFarmsByCrops).toHaveBeenCalled();
  });

  it('should call getLandUse method and return land use data', async () => {
    const result = { arableAreaInHectares: 500, vegetationAreaInHectares: 300 };
    jest.spyOn(service, 'findLandUse').mockResolvedValue(result);

    expect(await controller.getLandUse()).toBe(result);
    expect(service.findLandUse).toHaveBeenCalled();
  });
});
