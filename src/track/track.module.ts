import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackRepository } from './track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [FavoritesModule, PrismaModule],
  controllers: [TrackController],
  providers: [
    TrackService,
    TrackRepository,
    AlbumRepository,
    ArtistRepository,
    PrismaService,
  ],
})
export class TrackModule {}
