import { Body, Controller, Post } from '@nestjs/common';
import { Get, Req, UseGuards } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Request } from 'express';
import { CreateUserDto } from '../user/dto/createUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body(ValidationPipe) SignUpUserDto: CreateUserDto) {
    return this.authService.signUp(SignUpUserDto);
  }

  @Post('login')
  async login(@Body(ValidationPipe) authUserDTO: CreateUserDto) {
    return this.authService.login(authUserDTO);
  }

  @UseGuards()
  @Get('refresh')
  async refreshAuthTokens(@Req() request: Request) {
    const userId = request.user['sub'];
    const refreshToken = request.user['refreshToken'];
    return this.authService.refreshAuthTokens(userId, refreshToken);
  }
}
