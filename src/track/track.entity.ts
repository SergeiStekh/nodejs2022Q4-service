import { v4 as uuid } from 'uuid';

export class Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
  favoritesId: string | null;

  constructor(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
    favoritesId: string | null = null,
  ) {
    this.id = uuid();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
    this.favoritesId = favoritesId;
  }

  public updateTrack(
    name: string,
    artistId: string | null,
    albumId: string | null,
    duration: number,
  ): void {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public getTrackId() {
    return this.id;
  }

  public getAlbumId() {
    return this.albumId;
  }

  public getArtistId() {
    return this.artistId;
  }

  public removeTrackAlbum() {
    this.albumId = null;
  }

  public removeTrackArtist() {
    this.artistId = null;
  }
}
