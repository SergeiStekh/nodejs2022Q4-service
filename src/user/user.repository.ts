import { Injectable } from '@nestjs/common';
import { UserPrisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return await this.prismaService.userPrisma.findMany();
  }

  public async findOneWithLogin(login: string) {
    const user = await this.prismaService.userPrisma.findFirst({
      where: { login },
    });
    return user;
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

  public async updatePassword(
    userId: string,
    newPassword: string,
    newVersion: number,
    updatedAt: string,
  ) {
    await this.prismaService.userPrisma.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
        version: newVersion,
        updatedAt: updatedAt,
      },
    });
  }

  public async updateToken(userId: string, refreshToken: string) {
    const user = await this.prismaService.userPrisma.findUnique({
      where: {
        id: userId,
      },
    });
    const updatedUser = await this.prismaService.userPrisma.update({
      where: {
        id: userId,
      },
      data: {
        ...user,
        refreshToken,
      },
    });
    return updatedUser;
  }
}
