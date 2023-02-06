import { v4 as uuid } from 'uuid';

export class Album {
  private readonly id: string;
  private name: string;
  private year: number;
  private artistId: string | null;

  constructor(name: string, year: number, artistId: string | null) {
    this.id = uuid();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public updateAlbum(
    name: string,
    year: number,
    artistId: string | null,
  ): void {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  removeAlbumArtist() {
    this.artistId = null;
  }

  public getAlbumId() {
    return this.id;
  }

  public getAlbumName() {
    return this.name;
  }

  public getAlbumYear() {
    return this.year;
  }

  public getAlbumArtistId() {
    return this.artistId;
  }
}
