import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @nestJS.Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @nestJS.Post('artist/:id')
  @nestJS.HttpCode(nestJS.HttpStatus.CREATED)
  addArtist(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.addArtistToFavorites(id);
    res
      .status(nestJS.HttpStatus.CREATED)
      .json(`Artist that has id ${id} is added to favorites`);
  }

  @nestJS.Delete('artist/:id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  deleteArtist(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.removeArtistFromFavorites(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }

  @nestJS.Post('album/:id')
  @nestJS.HttpCode(nestJS.HttpStatus.CREATED)
  addAlbum(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.addAlbumToFavorites(id);
    res
      .status(nestJS.HttpStatus.CREATED)
      .json(`Album that has id ${id} is added to favorites`);
  }

  @nestJS.Delete('album/:id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  deleteAlbum(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.removeAlbumFromFavorites(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }

  @nestJS.Post('track/:id')
  @nestJS.HttpCode(nestJS.HttpStatus.CREATED)
  addTrack(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.addTrackToFavorites(id);
    res
      .status(nestJS.HttpStatus.CREATED)
      .json(`Track that has id ${id} is added to favorites`);
  }

  @nestJS.Delete('track/:id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  deleteTrack(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.removeTrackFromFavorites(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
