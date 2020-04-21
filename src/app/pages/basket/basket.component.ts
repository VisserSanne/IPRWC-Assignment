import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BasketService } from "src/app/services/basket.service";
import { ItemService } from "src/app/services/item.service";
import { Item } from "../webshop/item/Item.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent {
  private user: firebase.User;
  public itemRefs: string[];
  public items: Item[] = [];
  public allItems: Item[] = [];
  public itemsDeleted: boolean = false;

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
      this.basketService.getItems(user.uid).subscribe(items => {
        this.allItems = items;
        this.itemDeleted(this.allItems);
      });
    }
  };

  itemDeleted(items: Item[]) {
    if (!items) {
      this.itemsDeleted = false;
      this.items = items;
    } else {
      for (let id in items) {
        let temp: Item = items[id];
        if (temp.name == "") {
          this.itemsDeleted = true;
        } else {
          this.items.push(temp);
        }
      }
    }
  }

  deleteUnavailableItems() {
    this.basketService.updateItems(this.user.uid, this.items).subscribe();
    this.allItems = this.items;
    this.itemsDeleted = false;
  }
}
