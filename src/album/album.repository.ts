import { Album } from './album.entity';
import { database } from '../database/database';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlbumRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return await this.prismaService.albumPrisma.findMany();
  }

  public async findAllByArtist(artistId: string) {
    const albums = await this.prismaService.albumPrisma.findMany();
    return albums.find((album) => album.artistId === artistId);
  }

  public async findOne(albumId: string) {
    const albums = await this.prismaService.albumPrisma.findMany();
    return albums.find((album) => album.id === albumId);
  }

  public async create(album) {
    await this.prismaService.albumPrisma.create({
      data: album,
    });
  }

  public async update(albumId, updatedAlbum) {
    await this.prismaService.albumPrisma.update({
      where: { id: albumId },
      data: updatedAlbum,
    });
  }

  public async delete(albumId: string) {
    await this.prismaService.albumPrisma.delete({ where: { id: albumId } });
  }
}
