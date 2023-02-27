import { Injectable } from '@nestjs/common';
import { AlbumPrisma, ArtistPrisma, TrackPrisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoritesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    const [favEntity] = await this.prismaService.favoritesPrisma.findMany({
      select: {
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    if (!favEntity) {
      return {
        artists: [],
        albums: [],
        tracks: [],
      };
    }
    return favEntity;
  }

  public async isArtistInFavorites(artistId: string) {
    const [artistEntity] = await this.prismaService.favoritesPrisma.findMany({
      select: {
        artists: {
          select: { id: true },
        },
      },
    });
    return !!artistEntity.artists.filter((el) => el.id === artistId).length;
  }

  public async addArtistToFavorites(artistId: string, artist: ArtistPrisma) {
    const favorites = await this.prismaService.favoritesPrisma.findMany();
    if (!favorites.length) {
      const emptyFavorites = await this.prismaService.favoritesPrisma.create({
        data: {},
      });
      await this.prismaService.artistPrisma.update({
        where: { id: artistId },
        data: { favoritesId: emptyFavorites.id },
      });
    } else {
      await this.prismaService.artistPrisma.update({
        where: { id: artistId },
        data: { favoritesId: favorites[0].id },
      });
    }
    return artist;
  }

  public async removeArtistFromFavorites(artistId: string) {
    await this.prismaService.artistPrisma.update({
      where: { id: artistId },
      data: { favoritesId: { set: null } },
    });
  }

  public async isAlbumInFavorites(albumId) {
    const [albumEntity] = await this.prismaService.favoritesPrisma.findMany({
      select: {
        albums: {
          select: { id: true },
        },
      },
    });
    return !!albumEntity.albums.filter((el) => el.id === albumId).length;
  }

  public async addAlbumToFavorites(albumId: string, album: AlbumPrisma) {
    const favorites = await this.prismaService.favoritesPrisma.findMany();

    if (!favorites.length) {
      const newFavorites = await this.prismaService.favoritesPrisma.create({
        data: {},
      });
      await this.prismaService.albumPrisma.update({
        where: { id: albumId },
        data: { favoritesId: newFavorites.id },
      });
    } else {
      await this.prismaService.albumPrisma.update({
        where: { id: albumId },
        data: { favoritesId: favorites[0].id },
      });
    }
    return album;
  }

  public async removeAlbumFromFavorites(albumId: string) {
    await this.prismaService.albumPrisma.update({
      where: { id: albumId },
      data: { favoritesId: { set: null } },
    });
  }

  public async isTrackInFavorites(trackId: string) {
    const [trackEntity] = await this.prismaService.favoritesPrisma.findMany({
      select: {
        tracks: {
          select: { id: true },
        },
      },
    });
    return !!trackEntity.tracks.filter((el) => el.id === trackId).length;
  }

  public async addTrackToFavorites(trackId: string, track: TrackPrisma) {
    const favorites = await this.prismaService.favoritesPrisma.findMany();

    if (!favorites.length) {
      const newFavorites = await this.prismaService.favoritesPrisma.create({
        data: {},
      });
      await this.prismaService.trackPrisma.update({
        where: { id: trackId },
        data: { favoritesId: newFavorites.id },
      });
    } else {
      await this.prismaService.trackPrisma.update({
        where: { id: trackId },
        data: { favoritesId: favorites[0].id },
      });
    }
    return track;
  }

  public async removeTrackFromFavorites(trackId) {
    await this.prismaService.trackPrisma.update({
      where: { id: trackId },
      data: { favoritesId: { set: null } },
    });
  }
}
