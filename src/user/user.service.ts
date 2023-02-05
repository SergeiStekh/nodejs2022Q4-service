import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import {
  Exception,
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll(): User[] {
    return this.userRepository.findAll();
  }

  findOne(userId: string): User {
    const user = this.userRepository.findOne(userId);
    if (!user) new Exception(NOT_FOUND, 'User', '');
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;
    if (!login || !password) {
      new Exception(BAD_REQUEST, '', 'to create user provide', [
        !login ? 'login' : '',
        !password ? 'password' : '',
      ]);
    }
    const user = new User(login, password);
    this.userRepository.create(user);
    return user;
  }

  delete(userId: string): void {
    if (!userId) {
      new Exception(BAD_REQUEST, '', 'to delete user, provide user ID.');
    }
    const user = this.findOne(userId);
    this.userRepository.delete(user);
  }

  updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto): User {
    const { oldPassword, newPassword } = updatePasswordDto;

    if (!userId || !oldPassword || !newPassword) {
      new Exception(BAD_REQUEST, '', 'provide', [
        !oldPassword ? 'old password' : '',
        !newPassword ? 'new password' : '',
      ]);
    }
    const user = this.findOne(userId);

    if (oldPassword !== user.getUserPassword()) {
      new Exception(FORBIDDEN, '', 'old password is incorrect.');
    }
    user.updateUserPassword(newPassword);
    return user;
  }
}
