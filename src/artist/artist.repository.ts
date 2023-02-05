import { Artist } from './artist.entity';
import { database } from 'src/database/database';

export class ArtistRepository {
  public findAll() {
    return database.artists;
  }

  public findOne(artistId: string) {
    return database.artists.find((artist) => artist.getArtistId() === artistId);
  }

  public create(artist: Artist) {
    database.artists = [...database.artists, artist];
  }

  public delete(artist: Artist) {
    const index = database.artists.indexOf(artist);
    if (index !== -1) {
      database.artists.splice(index, 1);
    }
  }
}
