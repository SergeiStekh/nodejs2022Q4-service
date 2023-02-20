import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll() {
    return await this.prismaService.artistPrisma.findMany();
  }

  public async findOne(artistId: string) {
    const artists = await this.prismaService.artistPrisma.findMany();
    return artists.find((artist) => artist.id === artistId);
  }

  public async create(artist) {
    await this.prismaService.artistPrisma.create({
      data: artist,
    });
  }

  public async update(artistId, updatedArtist) {
    await this.prismaService.artistPrisma.update({
      where: { id: artistId },
      data: updatedArtist,
    });
  }

  public async delete(artistId: string) {
    await this.prismaService.artistPrisma.delete({ where: { id: artistId } });
  }
}
