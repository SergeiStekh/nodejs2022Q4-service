import { Injectable } from '@nestjs/common';
import {
  Exception,
  NOT_FOUND,
  BAD_REQUEST,
  UNPROCESSABLE,
} from '../utils/exceptionsGenerator';
import { FavoritesRepository } from './favorites.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async findAll() {
    return await this.favoritesRepository.findAll();
  }

  async addArtistToFavorites(artistId: string) {
    const artist = await this.prismaService.artistPrisma.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      new Exception(UNPROCESSABLE, `artist with id ${artistId} is missing`);
    }

    await this.favoritesRepository.addArtistToFavorites(artistId, artist);
  }

  async removeArtistFromFavorites(artistId: string) {
    const artist = await this.prismaService.artistPrisma.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      new Exception(
        NOT_FOUND,
        `artist with id ${artistId} is missing and can't be removed from favorites`,
      );
    }
    const isInFavorites =
      this.favoritesRepository.isArtistInFavorites(artistId);

    if (!isInFavorites) {
      new Exception(
        BAD_REQUEST,
        '',
        `this artist with id ${artistId} is not in favorites and can be removed.`,
      );
    }
    await this.favoritesRepository.removeArtistFromFavorites(artistId);
  }

  async addAlbumToFavorites(albumId: string) {
    const album = await this.prismaService.albumPrisma.findFirst({
      where: { id: albumId },
    });
    const isInFavorites = this.favoritesRepository.isAlbumInFavorites(albumId);
    if (!album) {
      new Exception(UNPROCESSABLE, `album with id ${albumId} is missing`);
    }
    if (isInFavorites) {
      new Exception(BAD_REQUEST, '', 'this album is already in favorites.');
    }
    await this.favoritesRepository.addAlbumToFavorites(albumId, album);
  }

  async removeAlbumFromFavorites(albumId: string) {
    const album = await this.prismaService.albumPrisma.findFirst({
      where: { id: albumId },
    });
    const isInFavorites = this.favoritesRepository.isAlbumInFavorites(albumId);
    if (!album) {
      new Exception(
        NOT_FOUND,
        `album with id ${albumId} is missing and can't be removed from favorites`,
      );
    }
    if (!isInFavorites) {
      new Exception(
        BAD_REQUEST,
        '',
        `this album with id ${albumId} is not in favorites and can be removed.`,
      );
    }
    await this.favoritesRepository.removeAlbumFromFavorites(albumId);
  }

  async addTrackToFavorites(trackId: string) {
    const track = await this.prismaService.trackPrisma.findFirst({
      where: { id: trackId },
    });
    const isInFavorites = this.favoritesRepository.isTrackInFavorites(trackId);
    if (!track) {
      new Exception(UNPROCESSABLE, `track with id ${trackId} is missing`);
    }
    if (isInFavorites) {
      new Exception(BAD_REQUEST, '', 'this track is already in favorites.');
    }
    await this.favoritesRepository.addTrackToFavorites(trackId, track);
  }

  async removeTrackFromFavorites(trackId: string) {
    const track = await this.prismaService.trackPrisma.findUnique({
      where: { id: trackId },
    });
    const isInFavorites = this.favoritesRepository.isTrackInFavorites(trackId);
    if (!track) {
      new Exception(
        NOT_FOUND,
        `track with id ${trackId} is missing and can't be removed from favorites`,
      );
    }
    if (!isInFavorites) {
      new Exception(
        BAD_REQUEST,
        '',
        `this track with id ${trackId} is not in favorites and can be removed.`,
      );
    }
    await this.favoritesRepository.removeTrackFromFavorites(trackId);
  }
}
