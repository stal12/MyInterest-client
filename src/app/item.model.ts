export class Item {
  private _id: number;
  private _title: string;
  private _description: string;
  private _thumbnail: string;
  private _link: string;
  private _date: string;
  private _category: string;

  constructor(id: number, title: string, description: string, thumbnail: string, link: string, date: string, category: string) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._thumbnail = thumbnail;
    this._link = link;
    this._date = date;
    this._category = category;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get thumbnail(): string {
    return this._thumbnail;
  }

  set thumbnail(value: string) {
    this._thumbnail = value;
  }

  get link(): string {
    return this._link;
  }

  set link(value: string) {
    this._link = value;
  }

  get date(): string {
    return this._date;
  }

  set date(value: string) {
    this._date = value;
  }

  get category(): string {
    return this._category;
  }

  set category(value: string) {
    this._category = value;
  }
}
