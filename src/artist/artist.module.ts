import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from './artist.repository';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [FavoritesModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
