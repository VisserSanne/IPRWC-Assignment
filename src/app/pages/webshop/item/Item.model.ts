export class Item {
  public id: string;
  public name: string;
  public description: string;
  public price: number;
  public imagePath: string;
  public tags: Array<string>;

  constructor(
    id?: string,
    name?: string,
    description?: string,
    price?: number,
    imagePath?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imagePath = imagePath;
  }
}
