import { Response } from 'express';
import * as nestJS from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrackDto';
import { TrackService } from './track.service';
import { FavoritesService } from '../favorites/favorites.service';

@nestJS.UseInterceptors(nestJS.ClassSerializerInterceptor)
@nestJS.Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @nestJS.Get(':id')
  async findOne(@nestJS.Param('id', nestJS.ParseUUIDPipe) id: string) {
    return await this.trackService.findOne(id);
  }

  @nestJS.Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @nestJS.Post()
  async create(@nestJS.Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.createTrack(createTrackDto);
  }

  @nestJS.Put(':id')
  async update(
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
    @nestJS.Body() createTrackDto: CreateTrackDto,
  ) {
    return await this.trackService.updateTrack(id, createTrackDto);
  }

  @nestJS.Delete(':id')
  @nestJS.HttpCode(nestJS.HttpStatus.NO_CONTENT)
  async delete(
    @nestJS.Res() res: Response,
    @nestJS.Param('id', nestJS.ParseUUIDPipe) id: string,
  ) {
    await this.trackService.deleteTrack(id);
    res.status(nestJS.HttpStatus.NO_CONTENT).json([]);
  }
}
