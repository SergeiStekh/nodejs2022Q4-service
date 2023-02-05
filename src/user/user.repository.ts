import { User } from './user.entity';

export class UserRepository {
  private users: User[] = [];

  public findAll() {
    return this.users;
  }

  public findOne(userId: string) {
    const user = this.users.find((user) => user.getUserId() === userId);
    return user;
  }

  public create(user: User) {
    this.users = [...this.users, user];
  }

  public delete(user: User) {
    const index = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
