import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from './producers.controller';
import { ProducersService } from './producers.service';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from '@nestjs/passport';

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: ProducersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findAllByUserId: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AuthGuard('jwt'),
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_SECRET') {
                return 'test-secret';
              }
              return null;
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
        {
          provide: PrismaService,
          useValue: {
            farm: {
              count: jest.fn(),
              aggregate: jest.fn(),
              groupBy: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ProducersController>(ProducersController);
    service = module.get<ProducersService>(ProducersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new producer', async () => {
      const createProducerDto: CreateProducerDto = {
        document: '123456789',
        producerName: 'Produtor Teste',
        farmNAme: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'SP',
        areaInHectares: 100,
        arableAreaInHectares: 50,
        vegetationAreaInHectares: 50,
        plantedCrops: ['Soja', 'Milho'],
        usersId: 'user-id',
      };

      const result = {
        id: 'producer-id',
        ...createProducerDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createProducerDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createProducerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const result = [
        {
          id: 'producer-id-1',
          document: '123456789',
          producerName: 'Produtor Teste',
          farmNAme: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'SP',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'producer-id-2',
          document: '123456710',
          producerName: 'Produtor Teste2',
          farmNAme: 'Fazenda Teste2',
          city: 'Cidade Teste',
          state: 'CE',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findAllByUserId', () => {
    it('should return producers by user ID', async () => {
      const userId = 'user-id';
      const result = [
        {
          id: 'producer-id-1',
          document: '123456789',
          producerName: 'Produtor Teste',
          farmNAme: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'SP',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'producer-id-2',
          document: '123456710',
          producerName: 'Produtor Teste2',
          farmNAme: 'Fazenda Teste2',
          city: 'Cidade Teste',
          state: 'CE',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAllByUserId').mockResolvedValue(result);

      expect(await controller.findAllByUserId(userId)).toEqual(result);
      expect(service.findAllByUserId).toHaveBeenCalledWith(userId);
    });
  });

  describe('findOne', () => {
    it('should return a producer by ID', async () => {
      const id = 'producer-id';
      const result = {
        id: 'producer-id-1',
        document: '123456789',
        producerName: 'Produtor Teste',
        farmNAme: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'SP',
        areaInHectares: 100,
        arableAreaInHectares: 50,
        vegetationAreaInHectares: 50,
        plantedCrops: ['Soja', 'Milho'],
        usersId: 'user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(id)).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a producer by ID', async () => {
      const id = 'producer-id';
      const updateProducerDto: UpdateProducerDto = {
        producerName: 'Novo Nome',
      };
      const result = {
        id: 'producer-id-1',
        document: '123456789',
        producerName: 'Produtor Teste',
        farmNAme: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'SP',
        areaInHectares: 100,
        arableAreaInHectares: 50,
        vegetationAreaInHectares: 50,
        plantedCrops: ['Soja', 'Milho'],
        usersId: 'user-id',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(id, updateProducerDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith(id, updateProducerDto);
    });
  });

  describe('remove', () => {
    it('should remove a producer by ID', async () => {
      const id = 'producer-id';
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
