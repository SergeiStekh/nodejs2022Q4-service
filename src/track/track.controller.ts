import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrackDto';
import { Track } from './track.entity';
import { TrackService } from './track.service';
import { FavoritesService } from '../favorites/favorites.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('track')
export class TrackController {
  constructor(
    private readonly trackService: TrackService,
    private readonly favoritesService: FavoritesService,
  ) {}

  @nestJS.Get(':id')
  findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string): Track {
    return this.trackService.findOne(id);
  }

  @nestJS.Get()
  findAll(): Track[] {
    return this.trackService.findAll();
  }

  @nestJS.Post()
  create(@nestJS.Body() createTrackDto: CreateTrackDto): Track {
    return this.trackService.createTrack(createTrackDto);
  }

  @nestJS.Put(':id')
  update(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() createTrackDto: CreateTrackDto,
  ): Track {
    return this.trackService.updateTrack(id, createTrackDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    this.favoritesService.removeTrackFromFavorites(id);
    this.trackService.deleteTrack(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
