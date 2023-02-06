import { database } from '../database/database';

export class FavoritesRepository {
  public findAll() {
    return database.favorites;
  }

  public isArtistInFavorites(artistId: string) {
    const artistIndex = database.favorites.artists.indexOf(artistId);
    if (artistIndex !== -1) {
      return true;
    } else {
      return false;
    }
  }

  public addArtistToFavorites(artistId: string) {
    database.favorites.artists = [...database.favorites.artists, artistId];
  }

  public removeArtistFromFavorites(artistId: string) {
    const index = database.favorites.artists.indexOf(artistId);
    if (index !== -1) {
      database.favorites.artists.splice(index, 1);
    }
  }

  public isAlbumInFavorites(albumId) {
    const albumIndex = database.favorites.albums.indexOf(albumId);
    if (albumIndex !== -1) {
      return true;
    } else {
      return false;
    }
  }

  public addAlbumToFavorites(albumId: string) {
    database.favorites.albums = [...database.favorites.albums, albumId];
  }

  public removeAlbumFromFavorites(albumId: string) {
    const albumIndex = database.favorites.albums.indexOf(albumId);
    if (albumIndex !== -1) {
      database.albums.splice(albumIndex, 1);
    }
  }

  public isTrackInFavorites(trackId: string) {
    const trackIndex = database.favorites.tracks.indexOf(trackId);
    if (trackIndex !== -1) {
      return true;
    } else {
      return false;
    }
  }

  public addTrackToFavorites(trackId) {
    database.favorites.tracks = [...database.favorites.tracks, trackId];
  }

  public removeTrackFromFavorites(trackId) {
    const trackIndex = database.favorites.tracks.indexOf(trackId);
    if (trackIndex !== -1) {
      database.favorites.tracks.splice(trackIndex, 1);
    }
  }
}
