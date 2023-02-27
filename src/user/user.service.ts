import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/userDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserPrisma } from '@prisma/client';
import { User } from './user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const user = await this.prismaService.userPrisma.findMany();
    return user;
  }

  async findOneWithId(id: string) {
    const user = await this.prismaService.userPrisma.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async findOneWithLogin(login: string) {
    const user = await this.prismaService.userPrisma.findFirst({
      where: {
        login,
      },
    });
    return user;
  }

  async create(UserDto: UserDto) {
    const { login, password } = UserDto;
    const userData: UserPrisma = new User(login, password);
    const newUser = await this.prismaService.userPrisma.create({
      data: userData,
    });
    return newUser;
  }

  async delete(id: string) {
    await this.prismaService.userPrisma.delete({
      where: {
        id,
      },
    });
  }

  async updatePassword(id: string, passwordDto: UpdatePasswordDto) {
    const { newPassword } = passwordDto;
    const user = await this.prismaService.userPrisma.findUnique({
      where: {
        id,
      },
    });

    const updatedUser = await this.prismaService.userPrisma.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
        version: user.version + 1,
      },
    });
    return updatedUser;
  }

  async updateToken(id: string, refreshToken: string) {
    const user = await this.prismaService.userPrisma.findUnique({
      where: {
        id,
      },
    });
    const updatedData = {
      ...user,
      refreshToken,
    };
    const updatedUser = await this.prismaService.userPrisma.update({
      where: {
        id,
      },
      data: updatedData,
    });
    return updatedUser;
  }
}
