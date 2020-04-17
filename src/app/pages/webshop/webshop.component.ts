import { Component } from "@angular/core";
import { Item } from "./item/Item.model";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-webshop",
  templateUrl: "./webshop.component.html",
  styleUrls: ["./webshop.component.scss"]
})
export class WebshopComponent {
  // ToDo: Hier items inladen vanuit de firebase
  public items: Item[] = [];

  constructor(private dataservice: ItemService) {
    this.dataservice.getItems().subscribe(items => (this.items = items));
  }
}
