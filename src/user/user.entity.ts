import { v4 as uuid } from 'uuid';

const VERSION = 1;

export class User {
  id: string;
  password: string;
  login: string;
  version: number;
  createdAt: string;
  updatedAt: string;

  constructor(login: string, password: string) {
    this.id = uuid();
    this.login = login;
    this.password = password;
    this.version = VERSION;
    this.createdAt = String(Date.now());
    this.updatedAt = String(Date.now());
  }

  public updateUserPassword(updatedPassword: string): void {
    this.password = updatedPassword;
    this.version += 1;
    this.updatedAt = String(Date.now());
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

  public getUserCreatedAt(): string {
    return this.createdAt;
  }

  public getUserUpdatedAt(): string {
    return this.updatedAt;
  }
}
