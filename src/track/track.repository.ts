import { Track } from './track.entity';
import { database } from '../database/database';
import { PrismaService } from '../prisma/prisma.service';

export class TrackRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return await this.prismaService.trackPrisma.findMany();
  }

  public async findAllTracksByArtist(artistId: string) {
    const tracks = await this.prismaService.trackPrisma.findMany();
    return tracks.find((track) => track.artistId === artistId);
  }

  public async findAllTracksByAlbum(albumId: string) {
    const tracks = await this.prismaService.trackPrisma.findMany();
    return await tracks.find((track) => track.albumId === albumId);
  }

  public async findOne(trackId: string) {
    const tracks = await this.prismaService.trackPrisma.findMany();
    return await tracks.find((track) => track.id === trackId);
  }

  public async create(track) {
    await this.prismaService.trackPrisma.create({
      data: track,
    });
  }

  public async delete(trackId: string) {
    await this.prismaService.trackPrisma.delete({ where: { id: trackId } });
  }

  public async update(trackId: string, updatedTrack) {
    await await this.prismaService.trackPrisma.update({
      where: { id: trackId },
      data: updatedTrack,
    });
  }
}
