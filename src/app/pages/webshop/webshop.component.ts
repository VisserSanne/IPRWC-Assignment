import { Component } from "@angular/core";
import { Item } from "./item/Item.model";

@Component({
  selector: "app-webshop",
  templateUrl: "./webshop.component.html",
  styleUrls: ["./webshop.component.scss"]
})
export class WebshopComponent {
  // ToDo: Hier items inladen vanuit de firebase
  public items: Item[] = [
    new Item("Amathist", "Super mooi", "", ["amathist"]),
    new Item("Rozenkwarts", "Roze", "", ["roze"]),
    new Item("Fluoriet", "In alle kleuren van de regenboog", "", ["Groen"])
  ];
}
