import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InitializationService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.ensureDefaultUser();
  }

  private async ensureDefaultUser() {
    const defaultUser = await this.prisma.users.findFirst({
      where: { name: 'Admin' },
    });

    if (!defaultUser) {
      await this.prisma.users.create({
        data: {
          name: 'Admin',
          password: 'admin123',
          active: true,
        },
      });

      console.log('criei o user');
    }
  }
}
