import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';

class Database {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
}

const database = new Database();
export { database };
