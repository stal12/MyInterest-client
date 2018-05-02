export class User {
  id: number;
  name: string;
  image: string;

  constructor(id: number, name: string, image: string) {
    this.id = id;
    this.name = name;
    this.image = image;
  }
}

export class UserGrosso extends User {
  email: string;
  categories: string[];
  friends: number[];
  pending: boolean;

  constructor(id: number, name: string, email: string, image: string, categories: string[], friends: number[], pending = false) {
    super(id, name, image);
    this.email = email;
    this.categories = categories;
    this.friends = friends;
    this.pending = pending;
  }
}
