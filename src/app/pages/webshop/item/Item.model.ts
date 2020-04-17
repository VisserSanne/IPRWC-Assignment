export class Item {
  public id: string;
  public name: string;
  public desciption: string;
  public imagePath: string;
  public tags: Array<string>;

  constructor(
    id?: string,
    name?: string,
    desciption?: string,
    imagePath?: string
  ) {
    this.id = id;
    this.name = name;
    this.desciption = desciption;
    this.imagePath = imagePath;
  }
}
