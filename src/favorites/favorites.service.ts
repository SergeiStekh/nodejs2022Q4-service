import { Injectable } from '@nestjs/common';
import {
  Exception,
  NOT_FOUND,
  BAD_REQUEST,
  UNPROCESSABLE,
} from '../utils/exceptionsGenerator';
import { Favorites } from './favorites.entity';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { TrackRepository } from '../track/track.repository';
import { FavoritesRepository } from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly favoritesRepository: FavoritesRepository,
  ) {}

  findAll(): Favorites {
    const {
      artists: artistsIds,
      albums: albumsIds,
      tracks: tracksIds,
    } = this.favoritesRepository.findAll();
    const artists = [...artistsIds].map((artistId) => {
      return this.artistRepository.findOne(artistId);
    });
    const albums = albumsIds.map((albumId) => {
      return this.albumRepository.findOne(albumId);
    });
    const tracks = tracksIds.map((trackId) => {
      return this.trackRepository.findOne(trackId);
    });
    return {
      artists,
      albums,
      tracks,
    };
  }

  addArtistToFavorites(artistId: string) {
    const artist = this.artistRepository.findOne(artistId);
    const isInFavorites =
      this.favoritesRepository.isArtistInFavorites(artistId);
    this.favoritesRepository.isArtistInFavorites(artistId);
    if (!artist) {
      new Exception(UNPROCESSABLE, `artist with id ${artistId} is missing`);
    }
    if (isInFavorites) {
      new Exception(BAD_REQUEST, '', 'this artist is already in favorites.');
    }
    this.favoritesRepository.addArtistToFavorites(artistId);
  }

  removeArtistFromFavorites(artistId: string) {
    const artist = this.artistRepository.findOne(artistId);
    const isInFavorites =
      this.favoritesRepository.isArtistInFavorites(artistId);
    if (!artist) {
      new Exception(
        NOT_FOUND,
        `artist with id ${artistId} is missing and can't be removed from favorites`,
      );
    }
    if (!isInFavorites) {
      new Exception(
        BAD_REQUEST,
        '',
        `this artist with id ${artistId} is not in favorites and can be removed.`,
      );
    }
    this.favoritesRepository.removeArtistFromFavorites(artistId);
  }

  addAlbumToFavorites(albumId: string) {
    const album = this.albumRepository.findOne(albumId);
    const isInFavorites = this.favoritesRepository.isAlbumInFavorites(albumId);
    if (!album) {
      new Exception(UNPROCESSABLE, `album with id ${albumId} is missing`);
    }
    if (isInFavorites) {
      new Exception(BAD_REQUEST, '', 'this album is already in favorites.');
    }
    this.favoritesRepository.addAlbumToFavorites(albumId);
  }

  removeAlbumFromFavorites(albumId: string) {
    const album = this.albumRepository.findOne(albumId);
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
    this.favoritesRepository.removeAlbumFromFavorites(albumId);
  }

  addTrackToFavorites(trackId: string) {
    const track = this.trackRepository.findOne(trackId);
    const isInFavorites = this.favoritesRepository.isTrackInFavorites(trackId);
    if (!track) {
      new Exception(UNPROCESSABLE, `track with id ${trackId} is missing`);
    }
    if (isInFavorites) {
      new Exception(BAD_REQUEST, '', 'this track is already in favorites.');
    }
    this.favoritesRepository.addTrackToFavorites(trackId);
  }

  removeTrackFromFavorites(trackId: string) {
    const track = this.trackRepository.findOne(trackId);
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
    this.favoritesRepository.removeTrackFromFavorites(trackId);
  }
}
