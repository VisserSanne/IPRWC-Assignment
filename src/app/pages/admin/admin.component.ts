import { Component, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Item } from "../webshop/item/Item.model";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent {
  @ViewChild("form", { static: true }) formValues;
  user: firebase.User;
  items: Item[] = [];

  constructor(authService: AuthService, private itemService: ItemService) {
    authService.getUserSubject().subscribe(user => {
      this.user = user;
    });
    this.itemService.getItems().subscribe(items => (this.items = items));
  }

  onSubmit(form) {
    const item = new Item(
      "-1",
      form.name,
      form.description,
      form.price,
      form.imagePath
    );
    console.log(item);
    this.itemService.createItem(item).subscribe();
    this.formValues.resetForm();
  }
}
