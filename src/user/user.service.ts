import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import {
  Exception,
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { UserPrisma } from '@prisma/client';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const user = await this.userRepository.findAll();
    return user;
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOne(userId);
    if (!user) new Exception(NOT_FOUND, 'User', '');
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    if (!login || !password) {
      new Exception(BAD_REQUEST, '', 'to create user provide', [
        !login ? 'login' : '',
        !password ? 'password' : '',
      ]);
    }
    const user: UserPrisma = new User(login, password);
    await this.userRepository.create(user);
    return user;
  }

  async delete(userId: string) {
    if (!userId) {
      new Exception(BAD_REQUEST, '', 'to delete user, provide user ID.');
    }
    const user = await this.findOne(userId);
    if (!user) {
      new Exception(NOT_FOUND, 'User', '');
    }
    await this.userRepository.delete(userId);
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    if (!userId || !oldPassword || !newPassword) {
      new Exception(BAD_REQUEST, '', 'provide', [
        !oldPassword ? 'old password' : '',
        !newPassword ? 'new password' : '',
      ]);
    }
    const user = await this.findOne(userId);
    if (!user) {
      new Exception(NOT_FOUND, 'user', '');
    }

    if (oldPassword !== user.password) {
      new Exception(FORBIDDEN, '', 'old password is incorrect.');
    }
    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = String(Date.now());

    await this.userRepository.updatePassword(
      userId,
      user.password,
      user.version,
      user.updatedAt,
    );
    return user;
  }
}
