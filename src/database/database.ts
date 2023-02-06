import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';
import { FavoritesInterface } from '../favorites/favorites.interface';

class Database {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  favorites: FavoritesInterface = {
    artists: [],
    albums: [],
    tracks: [],
  };
}

const database = new Database();
export { database };
