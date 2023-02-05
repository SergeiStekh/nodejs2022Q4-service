import { Injectable } from '@nestjs/common';
import { CredentialsInterface } from './models/credentials';
import { UpdatePasswordInterface } from './models/updatePassword';
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

  create(credentials: CredentialsInterface): User {
    const { login, password } = credentials;
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

  updatePassword(userId: string, credentials: UpdatePasswordInterface): User {
    const { oldPassword, newPassword } = credentials;

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
