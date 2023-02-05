import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { User } from './user.entity';
import { UserService } from './user.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @nestJS.Get(':id')
  findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string): User {
    return this.userService.findOne(id);
  }

  @nestJS.Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @nestJS.Post()
  create(@nestJS.Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @nestJS.Put(':id')
  updatePassword(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() updatePasswordDto: UpdatePasswordDto,
  ): User {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.userService.delete(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
