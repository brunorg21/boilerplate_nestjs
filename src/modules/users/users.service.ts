import { Injectable } from '@nestjs/common';
import { PrismaService } from '@database/PrismaService';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOwners() {
    return await this.prismaService.user.findMany({
      where: {
        role: Role.CompanyOwner,
      },
    });
  }
}
