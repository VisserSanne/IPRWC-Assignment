import { Component, Input, ViewChild } from "@angular/core";
import { ItemService } from "src/app/services/item.service";
import { Item } from "../../webshop/item/Item.model";

@Component({
  selector: "app-edit-items",
  templateUrl: "./edit-item.component.html",
  styleUrls: ["./edit-item.component.scss"]
})
export class EditItemComponent {
  @Input() item: Item;
  editing: boolean = false;

  constructor(private itemService: ItemService) {}

  startEdit() {
    this.editing = true;
  }

  submit(form) {
    // Todo values in new item + is item changed? : safe changes ? discard
    if (!this.formEmpty(form)) {
      const newItem = this.createNewItem(form);
      this.itemService.updateItem(newItem).subscribe();
    }

    this.editing = false;
  }

  deleteItem() {
    if (confirm(`Weet je zeker dat je ${this.item.name} wilt verwijderen?`)) {
      this.itemService.deleteItem(this.item.id).subscribe();
      alert("Item verwijderd");
    } else {
      alert("Item niet verwijderd");
    }
  }

  formEmpty(form): boolean {
    if (form.name && form.description && form.price && form.imagePath) {
      console.log("All empty");
      return true;
    } else {
      return false;
    }
  }

  createNewItem(form): Item {
    let newItem = new Item(this.item.id);

    form.name == ""
      ? (newItem.name = this.item.name)
      : (newItem.name = form.name);
    form.description == ""
      ? (newItem.description = this.item.description)
      : (newItem.description = form.description);
    form.price == ""
      ? (newItem.price = this.item.price)
      : (newItem.price = form.price);
    form.imagePath == ""
      ? (newItem.imagePath = this.item.imagePath)
      : (newItem.imagePath = form.imagePath);

    return newItem;
  }
}
