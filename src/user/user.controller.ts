import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserService } from './user.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @nestJS.Get(':id')
  async findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @nestJS.Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @nestJS.Post()
  async create(@nestJS.Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @nestJS.Put(':id')
  async updatePassword(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, updatePasswordDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  async delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    await this.userService.delete(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
