import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/userDto';
import { UserService } from '../user/user.service';
import * as argon from 'argon2';
import { JWTInterface } from './ts-interfaces/jwt.interface';
import { User } from '../user/user.entity';
import {
  Exception,
  BAD_REQUEST,
  NOT_FOUND,
} from '../utils/exceptionsGenerator';

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

  async signUp(userDTO: UserDto) {
    const { login, password } = userDTO;
    const user = await this.userService.findOneWithLogin(login);
    if (user) {
      new Exception(BAD_REQUEST, '', 'User is exist');
    }
    const hashedPassword = await this.getArgonHash(password);
    const newUser = await this.userService.create({
      login: login,
      password: hashedPassword,
    });
    const { id: newUserId, login: newUserLogin } = newUser;
    const tokens = await this.getAccessAndJWTTokens({
      id: newUserId,
      login: newUserLogin,
    });
    await this.updateRefreshToken(newUserId, tokens.refreshToken);
    return tokens;
  }

  async login(authUserDto: UserDto) {
    const { login, password } = authUserDto;
    const user = await this.userService.findOneWithLogin(login);
    if (!user) {
      new Exception(BAD_REQUEST, 'There is no user found');
    }
    const isPasswordRight = await argon.verify(user.password, password);

    if (!isPasswordRight) {
      new Exception(BAD_REQUEST, 'Provided login or password is invalid');
    }

    const tokens = await this.getAccessAndJWTTokens({
      id: user.id,
      login: user.login,
    });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async getArgonHash(value: string) {
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
    const hash = await this.getArgonHash(refreshToken);
    await this.userService.updateToken(id, hash);
  }

  async refreshAuthTokens(refreshToken: string) {
    const data = await this.jwtService.verifyAsync(refreshToken, {
      secret: refreshSecret,
    });
    const id = data.sub;

    if (!id) {
      new Exception(BAD_REQUEST, 'token is invalid');
    }
    const user = await this.userService.findOneWithId(id);
    if (!user) {
      new Exception(NOT_FOUND, '', `user with id ${id} not found`);
    }

    const isTokenEqual = await argon.verify(user.refreshToken, refreshToken);

    if (isTokenEqual) {
      new Exception(BAD_REQUEST, '', 'token is invalid or already expired');
    }
    const tokens = await this.getAccessAndJWTTokens({
      id: user.id,
      login: user.login,
    });
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
