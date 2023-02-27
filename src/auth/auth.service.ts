import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import { UserPrisma } from '@prisma/client';
import { JWTInterface } from './ts-interfaces/jwt.interface';
import { User } from '../user/user.entity';
import { Exception, BAD_REQUEST } from '../utils/exceptionsGenerator';

const secret = process.env.JWT_SECRET_KEY;
const expiresIn = process.env.TOKEN_EXPIRES_IN;

const refreshSecret = process.env.JWT_REFRESH_KEY;
const refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDTO: CreateUserDto) {
    const { login, password } = createUserDTO;
    const user = await this.userService.findOneWithLogin(login);
    if (user) {
      new Exception(BAD_REQUEST, '', 'User is exist');
      return;
    }
    const hashedPassword = await this.getHash(password);
    const newUser: UserPrisma = new User(login, hashedPassword);
    //await this.userService.create(createUserDTO);
    const tokens = await this.getAccessAndJWTTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async login(authUserDto: CreateUserDto) {
    const { login, password } = authUserDto;
    const user = await this.userService.findOneWithLogin(login);
    if (!user) {
      new Exception(BAD_REQUEST, 'There is no user found');
    }
    const isPasswordRight = await argon.verify(user.password, password);
    if (!isPasswordRight) {
      new Exception(BAD_REQUEST, 'Provided login or password is invalid');
    }
    const tokens = await this.getAccessAndJWTTokens({ login, password });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async getHash(value: string) {
    return argon.hash(value);
  }

  async getAccessAndJWTTokens(user: Partial<User>) {
    const { id, login } = user;
    const payload: JWTInterface = { sub: id, login };
    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret,
        expiresIn,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn,
      }),
    };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    await this.userService.updateToken(id, refreshToken);
  }

  async refreshAuthTokens(userId: string, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      new Exception(BAD_REQUEST, 'user with such id not found');
    }

    if (!user.refreshToken) {
      new Exception(BAD_REQUEST, 'provided data for auth is invalid');
    }

    if (user.refreshToken !== refreshToken) {
      new Exception(BAD_REQUEST, 'token is invalid');
    }

    const tokens = await this.getAccessAndJWTTokens(user);
    await this.updateRefreshToken(user.id, refreshToken);
    return tokens;
  }
}
