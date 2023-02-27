import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbumDto';
import {
  Exception,
  NOT_FOUND,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { Album } from './album.entity';
import { AlbumRepository } from './album.repository';
import { AlbumPrisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async findAll() {
    return await this.albumRepository.findAll();
  }

  async findOne(albumId: string) {
    const album = await this.albumRepository.findOne(albumId);
    if (!album) new Exception(NOT_FOUND, 'Album', '');
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
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

    const album: AlbumPrisma = new Album(name, year, artistId);
    await this.albumRepository.create(album);
    return album;
  }

  async updateAlbum(albumId: string, createAlbumDto: CreateAlbumDto) {
    if (!albumId) {
      new Exception(BAD_REQUEST, '', "to update album, provide album's ID.");
    }
    const album = await this.findOne(albumId);
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

    await this.albumRepository.update(albumId, {
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    });
    return album;
  }

  async deleteAlbum(albumId: string) {
    if (!albumId) {
      new Exception(BAD_REQUEST, '', "to delete album, provide album's ID.");
    }
    const album = await this.findOne(albumId);
    if (!album) {
      new Exception(NOT_FOUND, 'Album', '');
    }
    await this.albumRepository.delete(albumId);
  }
}
