import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtistDto';
import {
  Exception,
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { Artist } from './artist.entity';
import { ArtistRepository } from './artist.repository';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  findAll(): Artist[] {
    return this.artistRepository.findAll();
  }

  findOne(artistId: string): Artist {
    const artist = this.artistRepository.findOne(artistId);
    if (!artist) new Exception(NOT_FOUND, 'Artist', '');
    return artist;
  }

  createArtist(createArtistDto: CreateArtistDto): Artist {
    const { name, grammy } = createArtistDto;
    if (!name || grammy === undefined) {
      new Exception(BAD_REQUEST, '', 'to create artist provide', [
        !name ? 'name' : '',
        grammy === undefined ? 'grammy' : '',
      ]);
    }
    if (typeof createArtistDto.grammy !== 'boolean') {
      new Exception(BAD_REQUEST, '', 'Grammy field should be type of boolean');
    }
    const artist = new Artist(name, grammy);
    this.artistRepository.create(artist);
    return artist;
  }

  updateArtist(artistId: string, createArtistDto: CreateArtistDto) {
    if (!artistId) {
      new Exception(BAD_REQUEST, '', "to update artist, provide artist's ID.");
    }
    const artist = this.findOne(artistId);
    if (!artist) new Exception(NOT_FOUND, 'Artist', '');
    const { name, grammy } = createArtistDto;
    if (!name || grammy === undefined) {
      new Exception(
        BAD_REQUEST,
        '',
        'to update artist, update your request and provide',
        [!name ? 'name' : '', !grammy === undefined ? 'grammy' : ''],
      );
    }
    if (typeof grammy !== 'boolean') {
      new Exception(BAD_REQUEST, '', 'grammy field should be type of boolean');
    }
    artist.updateArtist(createArtistDto.name, createArtistDto.grammy);
    return artist;
  }

  deleteArtist(artistId: string): void {
    if (!artistId) {
      new Exception(BAD_REQUEST, '', "to delete artist, provide artist's ID.");
    }
    const artist = this.findOne(artistId);
    if (!artist) {
      new Exception(NOT_FOUND, 'Artist', '');
    }
    this.artistRepository.delete(artist);
  }
}
