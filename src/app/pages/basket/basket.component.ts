import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { BasketService } from "src/app/services/basket.service";
import { Item } from "../webshop/item/Item.model";

@Component({
  selector: "app-basket",
  templateUrl: "./basket.component.html",
  styleUrls: ["./basket.component.scss"]
})
export class BasketComponent {
  private user: firebase.User;
  public itemRefs: string[];
  public items: Item[] = [];
  public allItems: Item[] = [];
  public itemsDeleted: boolean = false;
  public checkingOut: boolean = false;

  constructor(authService: AuthService, private basketService: BasketService) {
    authService.getUserSubject().subscribe(this.setUser);
  }

  setUser = (user: firebase.User) => {
    this.user = user;
    if (user) {
      this.basketService.itemsObservable.subscribe(items => {
        if (items) {
          this.allItems = items;
          this.itemDeleted(this.allItems);
        }
      });
    }
  };

  itemDeleted(items: Item[]) {
    if (!items) {
      this.itemsDeleted = false;
      this.items = [];
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

  deleteItem(item: Item) {
    let newItems = [...this.items];
    for (var i = 0; i < newItems.length; i++) {
      if (newItems[i] === item) {
        newItems.splice(i, 1);
      }
    }
    this.basketService.updateItems(this.user.uid, newItems).subscribe();
    this.items = newItems;
  }

  deleteUnavailableItems() {
    this.basketService.updateItems(this.user.uid, this.items).subscribe();
    this.allItems = this.items;
    this.itemsDeleted = false;
  }

  checkOut() {
    this.checkingOut = true;
  }
}
