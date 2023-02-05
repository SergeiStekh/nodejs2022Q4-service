import { User } from './user.entity';
import { database } from '../database/database';

export class UserRepository {
  public findAll() {
    return database.users;
  }

  public findOne(userId: string) {
    const user = database.users.find((user) => user.getUserId() === userId);
    return user;
  }

  public create(user: User) {
    database.users = [...database.users, user];
  }

  public delete(user: User) {
    const index = database.users.indexOf(user);
    if (index !== -1) {
      database.users.splice(index, 1);
    }
  }
}
