import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { AlbumService } from './album.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @nestJS.Get(':id')
  async findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string) {
    return await this.albumService.findOne(id);
  }

  @nestJS.Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @nestJS.Post()
  async create(@nestJS.Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @nestJS.Put(':id')
  async update(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() createAlbumDto: CreateAlbumDto,
  ) {
    return await this.albumService.updateAlbum(id, createAlbumDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  async delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    await this.albumService.deleteAlbum(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
