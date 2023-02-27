import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { UserDto } from '../user/dto/userDto';
import { AuthService } from './auth.service';
import { RefreshTokenDTO } from './dto/tokenDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) signUpUserDto: UserDto) {
    return this.authService.signUp(signUpUserDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) authUserDTO: UserDto) {
    return this.authService.login(authUserDTO);
  }

  @Post('refresh')
  async refreshAuthTokens(@Body() refreshTokenDTO: RefreshTokenDTO) {
    const token = refreshTokenDTO.refreshToken;
    if (!token) {
      new HttpException('invalid authetication data', HttpStatus.UNAUTHORIZED);
    }
    return this.authService.refreshAuthTokens(refreshTokenDTO.refreshToken);
  }
}
