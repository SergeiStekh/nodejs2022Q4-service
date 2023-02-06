import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { Album } from './album.entity';
import { AlbumService } from './album.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('album')
export class AlbumController {
  constructor(
    private readonly albumService: AlbumService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @nestJS.Get(':id')
  findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string): Album {
    return this.albumService.findOne(id);
  }

  @nestJS.Get()
  findAll(): Album[] {
    return this.albumService.findAll();
  }

  @nestJS.Post()
  create(@nestJS.Body() createAlbumDto: CreateAlbumDto): Album {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @nestJS.Put(':id')
  update(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() createAlbumDto: CreateAlbumDto,
  ): Album {
    return this.albumService.updateAlbum(id, createAlbumDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.removeAlbumFromFavorites(id);
    this.albumService.deleteAlbum(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
