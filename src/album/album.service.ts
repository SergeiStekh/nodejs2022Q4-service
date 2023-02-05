import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbumDto';
import {
  Exception,
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';
import { ArtistRepository } from '../artist/artist.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  findAll(): Album[] {
    return this.albumRepository.findAll();
  }

  findOne(albumId: string): Album {
    const album = this.albumRepository.findOne(albumId);
    if (!album) new Exception(NOT_FOUND, 'Album', '');
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const { name, year, artistId } = createAlbumDto;
    if (!name || !year || artistId === undefined) {
      new Exception(BAD_REQUEST, '', 'to create album provide', [
        !name ? 'name' : '',
        !year ? 'year' : '',
        artistId === undefined ? 'artistId' : '',
      ]);
    }
    if (typeof createAlbumDto.name !== 'string') {
      new Exception(BAD_REQUEST, '', 'Name field should be type of string');
    }
    if (typeof createAlbumDto.year !== 'number') {
      new Exception(BAD_REQUEST, '', 'Year field should be type of number');
    }
    if (artistId !== null && typeof artistId !== 'string') {
      new Exception(
        BAD_REQUEST,
        '',
        'artistId field should be type of string or null',
      );
    }
    if (!this.artistRepository.findOne(artistId) && artistId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such artist with provided artistId',
      );
    }
    const album = new Album(name, year, artistId);
    this.albumRepository.create(album);
    return album;
  }

  updateAlbum(albumId: string, createAlbumDto: CreateAlbumDto) {
    if (!albumId) {
      new Exception(BAD_REQUEST, '', "to update album, provide album's ID.");
    }
    const album = this.findOne(albumId);
    if (!album) new Exception(NOT_FOUND, 'Album', '');
    const { name, year, artistId } = createAlbumDto;
    if (!name || !year || artistId === undefined) {
      new Exception(BAD_REQUEST, '', 'to update album provide', [
        !name ? 'name' : '',
        !year ? 'year' : '',
        artistId === undefined ? 'artistId' : '',
      ]);
    }
    if (typeof createAlbumDto.name !== 'string') {
      new Exception(BAD_REQUEST, '', 'Name field should be type of string');
    }
    if (typeof createAlbumDto.year !== 'number') {
      new Exception(BAD_REQUEST, '', 'Year field should be type of number');
    }
    if (artistId !== null && typeof artistId !== 'string') {
      new Exception(
        BAD_REQUEST,
        '',
        'artistId field should be type of string or null',
      );
    }
    if (!this.artistRepository.findOne(artistId) && artistId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such artist with provided artistId',
      );
    }
    album.updateAlbum(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );
    return album;
  }

  deleteAlbum(albumId: string): void {
    if (!albumId) {
      new Exception(BAD_REQUEST, '', "to delete album, provide album's ID.");
    }
    const album = this.findOne(albumId);
    if (!album) {
      new Exception(NOT_FOUND, 'Album', '');
    }
    this.albumRepository.delete(album);
  }
}
