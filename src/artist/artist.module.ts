import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from './artist.repository';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [FavoritesModule, PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository, PrismaService],
})
export class ArtistModule {}
