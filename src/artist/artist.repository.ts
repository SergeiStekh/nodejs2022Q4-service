import { Artist } from './artist.entity';

export class ArtistRepository {
  private artists: Artist[] = [];

  public findAll() {
    return this.artists;
  }

  public findOne(artistId: string) {
    return this.artists.find((artist) => artist.getArtistId() === artistId);
  }

  public create(artist: Artist) {
    this.artists = [...this.artists, artist];
  }

  public delete(artist: Artist) {
    const index = this.artists.indexOf(artist);
    if (index !== -1) {
      this.artists.splice(index, 1);
    }
    this.artists.splice(index, 1);
  }
}
