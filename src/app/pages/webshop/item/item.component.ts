import { Component, Input } from "@angular/core";
import { Item } from "./Item.model";
import { BasketService } from "src/app/services/basket.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"]
})
export class ItemComponent {
  user: firebase.User;
  @Input() item: Item;
  role: string = "admin";
  items: Item[] = [];

  constructor(
    private authService: AuthService,
    private basketService: BasketService
  ) {
    authService.getUserSubject().subscribe(this.setUser);
  }
  setUser = (user: firebase.User) => {
    this.user = user;
    if (user) {
      this.authService.getRole(user.uid).subscribe(role => (this.role = role));
      this.basketService.itemsObservable.subscribe(items => {
        if (items) {
          this.items = items;
        }
      });
    }
  };

  addToBasket() {
    this.items.push(this.item);
    this.basketService.updateItems(this.user.uid, this.items).subscribe();
  }
}
