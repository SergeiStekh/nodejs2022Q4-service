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

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
  ) {}

  findAll(): Track[] {
    return this.trackRepository.findAll();
  }

  findOne(trackId: string): Track {
    const track = this.trackRepository.findOne(trackId);
    if (!track) new Exception(NOT_FOUND, 'Track', '');
    return track;
  }

  createTrack(createTrackDto: CreateTrackDto): Track {
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
    if (!this.albumRepository.findOne(albumId) && albumId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such album with provided albumId',
      );
    }
    if (!this.artistRepository.findOne(artistId) && artistId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such artist with provided artistId',
      );
    }
    const track = new Track(name, artistId, albumId, duration);
    this.trackRepository.create(track);
    return track;
  }

  updateTrack(trackId: string, createTrackDto: CreateTrackDto) {
    if (!trackId) {
      new Exception(BAD_REQUEST, '', "to update track, provide track's ID.");
    }
    const track = this.findOne(trackId);
    if (!track) new Exception(NOT_FOUND, 'Track', '');
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
    if (!this.albumRepository.findOne(albumId) && albumId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such album with provided albumId',
      );
    }
    if (!this.artistRepository.findOne(artistId) && artistId !== null) {
      new Exception(
        BAD_REQUEST,
        '',
        'there is no such artist with provided artistId',
      );
    }
    track.updateTrack(
      createTrackDto.name,
      createTrackDto.artistId,
      createTrackDto.albumId,
      createTrackDto.duration,
    );
    return track;
  }

  deleteTrack(trackId: string): void {
    if (!trackId) {
      new Exception(BAD_REQUEST, '', "to delete track, provide track's ID.");
    }
    const track = this.findOne(trackId);
    if (!track) {
      new Exception(NOT_FOUND, 'Track', '');
    }
    this.trackRepository.delete(track);
  }
}
