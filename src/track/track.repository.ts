import { Track } from './track.entity';
import { database } from '../database/database';

export class TrackRepository {
  public findAll() {
    return database.tracks;
  }

  public findAllTracksByArtist(artistId: string) {
    return database.tracks.find((track) => track.getArtistId() === artistId);
  }

  public findAllTracksByAlbum(albumId: string) {
    return database.tracks.find((track) => track.getAlbumId() === albumId);
  }

  public findOne(trackId: string) {
    return database.tracks.find((track) => track.getTrackId() === trackId);
  }

  public create(track: Track) {
    database.tracks = [...database.tracks, track];
  }

  public delete(track: Track) {
    const index = database.tracks.indexOf(track);
    if (index !== -1) {
      database.tracks.splice(index, 1);
    }
  }
}
