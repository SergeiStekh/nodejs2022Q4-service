import { Injectable } from '@nestjs/common';
import { UserPrisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return await this.prismaService.userPrisma.findMany();
  }

  public async findOne(userId: string) {
    const user = await this.prismaService.userPrisma.findUnique({
      where: { id: userId },
    });
    return user;
  }

  public async create(user: UserPrisma) {
    await this.prismaService.userPrisma.create({
      data: user,
    });
  }

  public async delete(userId: string) {
    await this.prismaService.userPrisma.delete({ where: { id: userId } });
  }
}
