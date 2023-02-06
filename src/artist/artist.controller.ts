import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtistDto';
import { Artist } from './artist.entity';
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
  findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string): Artist {
    return this.artistService.findOne(id);
  }

  @nestJS.Get()
  findAll(): Artist[] {
    return this.artistService.findAll();
  }

  @nestJS.Post()
  create(@nestJS.Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.createArtist(createArtistDto);
  }

  @nestJS.Put(':id')
  update(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() createArtistDto: CreateArtistDto,
  ): Artist {
    return this.artistService.updateArtist(id, createArtistDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.removeArtistFromFavorites(id);
    this.artistService.deleteArtist(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
