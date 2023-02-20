import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtistDto';
import {
  Exception,
  NOT_FOUND,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { Artist } from './artist.entity';
import { ArtistRepository } from './artist.repository';
import { ArtistPrisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async findAll() {
    return await this.artistRepository.findAll();
  }

  async findOne(artistId: string) {
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist) new Exception(NOT_FOUND, 'Artist', '');
    return artist;
  }

  async createArtist(createArtistDto: CreateArtistDto) {
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
    const artist: ArtistPrisma = new Artist(name, grammy);
    await this.artistRepository.create(artist);
    return artist;
  }

  async updateArtist(artistId: string, createArtistDto: CreateArtistDto) {
    if (!artistId) {
      new Exception(BAD_REQUEST, '', "to update artist, provide artist's ID.");
    }
    const artist = await this.findOne(artistId);
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
    await this.artistRepository.update(artistId, {
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    return artist;
  }

  async deleteArtist(artistId: string) {
    if (!artistId) {
      new Exception(BAD_REQUEST, '', "to delete artist, provide artist's ID.");
    }
    const artist = await this.findOne(artistId);
    if (!artist) {
      new Exception(NOT_FOUND, 'Artist', '');
    }
    await this.artistRepository.delete(artistId);
  }
}
