import { Test, TestingModule } from '@nestjs/testing';
import { ProducersService } from './producers.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

describe('ProducersService', () => {
  let service: ProducersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: PrismaService,
          useValue: {
            ruralProducers: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProducersService>(ProducersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a producer successfully', async () => {
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

      jest
        .spyOn(prismaService.ruralProducers, 'create')
        .mockResolvedValue(result);

      expect(await service.create(createProducerDto)).toEqual(result);
      expect(prismaService.ruralProducers.create).toHaveBeenCalledWith({
        data: createProducerDto,
      });
    });

    it('should throw BadRequestException if areas are not valid', async () => {
      const createProducerDto: CreateProducerDto = {
        document: '123456789',
        producerName: 'Produtor Teste',
        farmNAme: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'SP',
        areaInHectares: 100,
        arableAreaInHectares: 70,
        vegetationAreaInHectares: 40,
        plantedCrops: ['Soja', 'Milho'],
        usersId: 'user-id',
      };

      await expect(service.create(createProducerDto)).rejects.toThrow(
        new BadRequestException(
          'A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.',
        ),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of producers', async () => {
      const result = [
        {
          id: 'producer-id-1',
          producerName: 'Produtor 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          document: '123456789',
          farmNAme: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'SP',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
        },
        {
          id: 'producer-id-2',
          producerName: 'Produtor 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          document: '123456789',
          farmNAme: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'SP',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
        },
      ];

      jest
        .spyOn(prismaService.ruralProducers, 'findMany')
        .mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
      expect(prismaService.ruralProducers.findMany).toHaveBeenCalled();
    });
  });

  describe('findAllByUserId', () => {
    it('should return producers by user ID', async () => {
      const userId = 'user';
      const result = [
        {
          id: 'producer-id-1',
          producerName: 'Produtor 1',
          createdAt: new Date(),
          updatedAt: new Date(),
          document: '123456789',
          farmNAme: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'SP',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
        },
        {
          id: 'producer-id-2',
          producerName: 'Produtor 2',
          createdAt: new Date(),
          updatedAt: new Date(),
          document: '123456789',
          farmNAme: 'Fazenda Teste',
          city: 'Cidade Teste',
          state: 'SP',
          areaInHectares: 100,
          arableAreaInHectares: 50,
          vegetationAreaInHectares: 50,
          plantedCrops: ['Soja', 'Milho'],
          usersId: 'user-id',
        },
      ];

      jest
        .spyOn(prismaService.ruralProducers, 'findMany')
        .mockResolvedValue(result);

      expect(await service.findAllByUserId(userId)).toEqual(result);
      expect(prismaService.ruralProducers.findMany).toHaveBeenCalledWith({
        where: { usersId: userId },
      });
    });
  });

  describe('findOne', () => {
    it('should return a producer by ID', async () => {
      const id = 'producer-id';
      const result = {
        id: 'producer-id-2',
        producerName: 'Produtor 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        document: '123456789',
        farmNAme: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'SP',
        areaInHectares: 100,
        arableAreaInHectares: 50,
        vegetationAreaInHectares: 50,
        plantedCrops: ['Soja', 'Milho'],
        usersId: 'user-id',
      };

      jest
        .spyOn(prismaService.ruralProducers, 'findUnique')
        .mockResolvedValue(result);

      expect(await service.findOne(id)).toEqual(result);
      expect(prismaService.ruralProducers.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('update', () => {
    it('should update a producer by ID', async () => {
      const id = 'producer-id';
      const updateProducerDto: UpdateProducerDto = {
        producerName: 'Novo Nome',
      };
      const result = {
        id: 'producer-id-2',
        producerName: 'Produtor 2',
        createdAt: new Date(),
        updatedAt: new Date(),
        document: '123456789',
        farmNAme: 'Fazenda Teste',
        city: 'Cidade Teste',
        state: 'SP',
        areaInHectares: 100,
        arableAreaInHectares: 50,
        vegetationAreaInHectares: 50,
        plantedCrops: ['Soja', 'Milho'],
        usersId: 'user-id',
      };

      jest
        .spyOn(prismaService.ruralProducers, 'update')
        .mockResolvedValue(result);

      expect(await service.update(id, updateProducerDto)).toEqual(result);
      expect(prismaService.ruralProducers.update).toHaveBeenCalledWith({
        data: updateProducerDto,
        where: { id },
      });
    });

    it('should throw BadRequestException if areas are not valid', async () => {
      const id = 'producer-id';
      const updateProducerDto: UpdateProducerDto = {
        areaInHectares: 100,
        arableAreaInHectares: 70,
        vegetationAreaInHectares: 40,
      };

      await expect(service.update(id, updateProducerDto)).rejects.toThrow(
        new BadRequestException(
          'A soma da área agricultável e da vegetação não pode ser maior que a área total da fazenda.',
        ),
      );
    });
  });

  describe('remove', () => {
    it('should remove a producer by ID', async () => {
      const id = 'producer-id';
      jest
        .spyOn(prismaService.ruralProducers, 'delete')
        .mockResolvedValue(undefined);

      await service.remove(id);
      expect(prismaService.ruralProducers.delete).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });
});
