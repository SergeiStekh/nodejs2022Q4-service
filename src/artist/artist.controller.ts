import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtistDto';
import { ArtistService } from './artist.service';
import { FavoritesService } from '../favorites/favorites.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @nestJS.Get(':id')
  async findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string) {
    return await this.artistService.findOne(id);
  }

  @nestJS.Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @nestJS.Post()
  async create(@nestJS.Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.createArtist(createArtistDto);
  }

  @nestJS.Put(':id')
  async update(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() createArtistDto: CreateArtistDto,
  ) {
    return await this.artistService.updateArtist(id, createArtistDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  async delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    await this.favoritesService.removeArtistFromFavorites(id);
    await this.artistService.deleteArtist(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
