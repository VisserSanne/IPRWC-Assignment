import { Component } from "@angular/core";
import { Item } from "./item/Item.model";
import { DataService } from "src/app/data.service";

@Component({
  selector: "app-webshop",
  templateUrl: "./webshop.component.html",
  styleUrls: ["./webshop.component.scss"]
})
export class WebshopComponent {
  // ToDo: Hier items inladen vanuit de firebase
  public items: Item[] = [];

  constructor(private dataservice: DataService) {
    this.dataservice.getItems().subscribe(items => (this.items = items));
  }
}
