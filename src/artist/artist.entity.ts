import { v4 as uuid } from 'uuid';

export class Artist {
  private readonly id: string;
  private name: string;
  private grammy: boolean;

  constructor(name: string, grammy = false) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
  }

  public updateArtist(name: string, grammy: boolean): void {
    this.name = name;
    this.grammy = grammy;
  }

  public getArtistId() {
    return this.id;
  }

  public getArtistName() {
    return this.name;
  }

  public isArtistHasGrammy() {
    return this.grammy;
  }
}
