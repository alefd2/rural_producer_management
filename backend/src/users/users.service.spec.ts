import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'john doe',
        password: '1234',
        active: true,
      };

      const createdUser = {
        id: '1',
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.users, 'create').mockResolvedValue(createdUser);

      expect(await service.create(createUserDto)).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: 'cm0ukgypw00006qkp6hw2rsmv',
          name: 'john doe',
          password: '1234',
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(prismaService.users, 'findMany').mockResolvedValue(users);

      expect(await service.findAll()).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = {
        id: '1',
        name: 'john doe',
        password: '1234',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.users, 'findUnique').mockResolvedValue(user);

      expect(await service.findOne('1')).toEqual(user);
    });
  });

  describe('findOneByName', () => {
    it('should return a user by name', async () => {
      const user = {
        id: '1',
        name: 'john doe',
        password: '1234',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.users, 'findFirst').mockResolvedValue(user);

      expect(await service.findOneByName('Test User')).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'john doe',
        password: '1234',
      };

      const updatedUser = {
        id: '1',
        name: 'john doe',
        password: '1234',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.users, 'update').mockResolvedValue(updatedUser);

      expect(await service.update('1', updateUserDto)).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const deletedUser = {
        id: '1',
        name: 'john doe',
        password: '1234',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.users, 'delete').mockResolvedValue(deletedUser);

      expect(await service.remove('1')).toEqual(deletedUser);
    });
  });
});
