import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrackDto';
import {
  Exception,
  NOT_FOUND,
  BAD_REQUEST,
} from '../utils/exceptionsGenerator';
import { Track } from './track.entity';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { TrackRepository } from './track.repository';
import { TrackPrisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  async findAll() {
    return await this.trackRepository.findAll();
  }

  async findOne(trackId: string) {
    const track = await this.trackRepository.findOne(trackId);
    if (!track) new Exception(NOT_FOUND, 'Track', '');
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createTrackDto;
    if (
      !name ||
      artistId === undefined ||
      albumId === undefined ||
      duration === undefined
    ) {
      new Exception(BAD_REQUEST, '', 'to create track provide', [
        !name ? 'name' : '',
        artistId === undefined ? 'artistId' : '',
        albumId === undefined ? 'albumId' : '',
        duration === undefined ? 'duration' : '',
      ]);
    }
    if (typeof createTrackDto.name !== 'string') {
      new Exception(BAD_REQUEST, '', 'Name field should be type of string');
    }
    if (typeof createTrackDto.duration !== 'number') {
      new Exception(BAD_REQUEST, '', 'duration field should be type of number');
    }
    if (artistId !== null && typeof artistId !== 'string') {
      new Exception(
        BAD_REQUEST,
        '',
        'artistId field should be type of string or null',
      );
    }
    if (albumId !== null && typeof albumId !== 'string') {
      new Exception(
        BAD_REQUEST,
        '',
        'albumId field should be type of string or null',
      );
    }
    const album = await this.albumRepository.findOne(albumId);
    if (!album && albumId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such album with provided albumId',
      );
    }
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist && artistId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such artist with provided artistId',
      );
    }
    const track: TrackPrisma = new Track(name, artistId, albumId, duration);
    await this.trackRepository.create(track);
    return track;
  }

  async updateTrack(trackId: string, createTrackDto: CreateTrackDto) {
    if (!trackId) {
      new Exception(BAD_REQUEST, '', "to update track, provide track's ID.");
    }
    const track = await this.findOne(trackId);
    if (!track) new Exception(NOT_FOUND, 'Track', '');
    const { name, artistId, albumId, duration } = createTrackDto;

    if (
      !name ||
      artistId === undefined ||
      albumId === undefined ||
      duration === undefined
    ) {
      new Exception(BAD_REQUEST, '', 'to update track provide', [
        !name ? 'name' : '',
        artistId === undefined ? 'artistId' : '',
        albumId === undefined ? 'albumId' : '',
        duration === undefined ? 'duration' : '',
      ]);
    }
    if (typeof createTrackDto.name !== 'string') {
      new Exception(BAD_REQUEST, '', 'Name field should be type of string');
    }
    if (typeof createTrackDto.duration !== 'number') {
      new Exception(BAD_REQUEST, '', 'duration field should be type of number');
    }
    if (artistId !== null && typeof artistId !== 'string') {
      new Exception(
        BAD_REQUEST,
        '',
        'artistId field should be type of string or null',
      );
    }
    if (albumId !== null && typeof albumId !== 'string') {
      new Exception(
        BAD_REQUEST,
        '',
        'albumId field should be type of string or null',
      );
    }
    const album = await this.albumRepository.findOne(albumId);
    if (!album && albumId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such album with provided albumId',
      );
    }
    const artist = await this.artistRepository.findOne(artistId);
    if (!artist && artistId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such artist with provided artistId',
      );
    }
    await this.trackRepository.update(trackId, {
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
    return track;
  }

  async deleteTrack(trackId: string) {
    if (!trackId) {
      new Exception(BAD_REQUEST, '', "to delete track, provide track's ID.");
    }
    const track = await this.findOne(trackId);
    if (!track) {
      new Exception(NOT_FOUND, 'Track', '');
    }
    this.trackRepository.delete(trackId);
  }
}
