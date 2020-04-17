import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BasketService } from "src/app/services/basket.service";
import { ItemService } from "src/app/services/item.service";
import { Item } from "../webshop/item/Item.model";

@Component({
  selector: "app-home",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent {
  private user: firebase.User;
  public itemRefs: string[];
  public items: Item[] = [];

  constructor(
    private authService: AuthService,
    private basketService: BasketService,
    private itemService: ItemService
  ) {
    authService.getUserSubject().subscribe(this.setUser);
  }

  setUser = (user: firebase.User) => {
    this.user = user;
    if (user) {
      this.basketService.getItemRefs(user.uid).subscribe(items => {
        this.itemRefs = items;
        this.getItemsFromRef();
      });
    }
  };

  getItemsFromRef() {
    if (this.itemRefs) {
      for (let id in this.itemRefs) {
        let item = this.itemRefs[id];
        this.itemService.getItem(item).subscribe(item => {
          this.items.push(item);
        });
      }
    }
  }
}
