import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { UserDto } from './dto/userDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserService } from './user.service';
import {
  Exception,
  NOT_FOUND,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { HttpCode } from '@nestjs/common';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @nestJS.Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @nestJS.Get(':id')
  async findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string) {
    const user = await this.userService.findOneWithId(id);
    if (!user) {
      new Exception(NOT_FOUND, '', `user with id ${id} not found`);
    }
    return user;
  }

  @nestJS.Post()
  async create(@nestJS.Body() userDto: UserDto) {
    const newUser = await this.userService.create(userDto);
    return newUser;
  }

  @nestJS.Put(':id')
  async updatePassword(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const user = await this.userService.findOneWithId(id);
    if (!user) {
      new Exception(NOT_FOUND, '', `user with id ${id} not found`);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      new Exception(BAD_REQUEST, '', 'enter right old password');
    }
    const updatedUser = await this.userService.updatePassword(
      user.id,
      updatePasswordDto,
    );
    return updatedUser;
  }

  @HttpCode(204)
  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  async delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    const user = await this.userService.findOneWithId(id);
    if (!user) {
      new Exception(BAD_REQUEST, '', `User with id ${id} not found`);
    }
  }
}
