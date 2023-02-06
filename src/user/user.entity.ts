import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

const VERSION = 1;

export class User {
  private readonly id: string;
  private login: string;
  private version: number;
  private createdAt: number;
  private updatedAt: number;

  @Exclude()
  private password: string;

  constructor(login: string, password: string) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.version = VERSION;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  public updateUserPassword(updatedPassword: string): void {
    this.password = updatedPassword;
    this.version += 1;
    this.updatedAt = Date.now();
  }

  public getUserId(): string {
    return this.id;
  }

  public getUserLogin(): string {
    return this.login;
  }

  public getUserPassword(): string {
    return this.password;
  }

  public getUserVersion(): number {
    return this.version;
  }

  public getUserCreatedAt(): number {
    return this.createdAt;
  }

  public getUserUpdatedAt(): number {
    return this.updatedAt;
  }
}
