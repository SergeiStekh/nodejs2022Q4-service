import { Album } from './album.entity';
import { database } from '../database/database';

export class AlbumRepository {
  public findAll() {
    return database.albums;
  }

  public findAllByArtist(artistId: string) {
    return database.albums.find(
      (album) => album.getAlbumArtistId() === artistId,
    );
  }

  public findOne(albumId: string) {
    return database.albums.find((album) => album.getAlbumId() === albumId);
  }

  public create(album: Album) {
    database.albums = [...database.albums, album];
  }

  public delete(album: Album) {
    const index = database.albums.indexOf(album);
    if (index !== -1) {
      database.albums.splice(index, 1);
    }
  }
}
