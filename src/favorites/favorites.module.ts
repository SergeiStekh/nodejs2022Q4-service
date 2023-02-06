import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    FavoritesRepository,
    ArtistRepository,
    TrackRepository,
    AlbumRepository,
  ],
})
export class FavoritesModule {}
