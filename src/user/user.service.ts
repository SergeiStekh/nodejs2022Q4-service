import { Injectable } from '@nestjs/common';
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

  create(login: string, password: string): User {
    if (!login || !password) {
      new Exception(
        BAD_REQUEST,
        '',
        'to create user provide login and password.',
      );
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

  updatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): User {
    if (!userId || !oldPassword || !newPassword) {
      new Exception(
        BAD_REQUEST,
        '',
        'provide userID, old password and new password.',
      );
    }
    const user = this.findOne(userId);

    if (oldPassword !== user.getUserPassword()) {
      new Exception(FORBIDDEN, '', 'old password is incorrect.');
    }
    user.updateUserPassword(newPassword);
    return user;
  }
}
