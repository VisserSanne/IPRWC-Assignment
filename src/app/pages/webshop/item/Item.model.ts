export class Item {
  public name: String;
  public desciption: String;
  public imagePath: String;
  public tags: Array<String>;

  constructor(
    name?: String,
    desciption?: String,
    imagePath?: String,
    tags?: Array<String>
  ) {
    this.name = name;
    this.desciption = desciption;
    this.imagePath = imagePath;
    this.tags = tags;
  }
}
