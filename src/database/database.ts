import { User } from '../user/user.entity';
import { Artist } from '../artist/artist.entity';
import { Album } from '../album/album.entity';
import { Track } from '../track/track.entity';

class Database {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
}

const database = new Database();
export { database };
