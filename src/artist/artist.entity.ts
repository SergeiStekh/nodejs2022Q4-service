import { v4 as uuid } from 'uuid';

export class Artist {
  id: string;
  name: string;
  grammy: boolean;
  favoritesId: string | null;

  constructor(name: string, grammy = false, favoritesId = null) {
    this.id = uuid();
    this.name = name;
    this.grammy = grammy;
    this.favoritesId = favoritesId;
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
