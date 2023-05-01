import { Entry } from "../../models/entry.model";
import { Anime } from "../../models/anime.model";
import { FirebaseHelper } from "./firebase.helper";
import { Nullable } from "../../types/nullable.type";
import { IEntry } from "../../types/entry/entry.type";
import { EntryType } from "../../enums/entry-type.enum";



export class EntriesHelper {

  /**
   * @description
   * The name of the key that stors the entries
   * on the realtime database
   */
  private static readonly DB_KEY = 'entries';

  /**
   * @description
   * Returns the list of all entries
   * @param cache Whether to use cache when needed
   */
  static async load(cache: boolean = true): Promise<Array<Entry>> {
    const data = await FirebaseHelper.get(this.DB_KEY, cache);
    return data?.map((entry: IEntry) => this.initEntry(entry));
  }

  /**
   * @description
   * Returns a specific entry
   *
   * @param id The ID of the entry
   * @param cache Whether to use cache when needed
   */
  static async get(id: string, cache: boolean = true): Promise<Nullable<Entry>> {
    const data = await this.load(cache);
    return data.find(entry => entry.id === id);
  }

  /**
   * @description
   * Instantiates the correct class of an entry
   *
   * @param entry The entry's model
   */
  static initEntry(entry: IEntry): Entry {
    switch (entry.type) {
      case EntryType.Anime: return new Anime(entry as any);
      default: return new Entry(entry);
    }
  }
}