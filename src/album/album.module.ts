import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepository } from './album.repository';
import { ArtistRepository } from '../artist/artist.repository';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, ArtistRepository],
})
export class AlbumModule {}
