import { Component, Input } from "@angular/core";
import { ItemService } from "src/app/services/item.service";
import { Item } from "../../webshop/item/Item.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-items",
  templateUrl: "./edit-item.component.html",
  styleUrls: ["./edit-item.component.scss"]
})
export class EditItemComponent {
  @Input() item: Item;
  editing: boolean = false;

  constructor(
    private itemService: ItemService,
    private _snackBar: MatSnackBar
  ) {}

  startEdit() {
    this.editing = true;
  }

  submit(form) {
    // Todo values in new item + is item changed? : safe changes ? discard
    if (!this.formEmpty(form)) {
      const newItem = this.createNewItem(form);
      this.itemService.updateItem(newItem);
      this.item = null;
    }

    this.editing = false;
  }

  deleteItem() {
    const { confirm, reject } = this.itemService.deleteItemAsync(this.item.id);
    let deleteSnackbarRef = this._snackBar.open(
      `"${this.item.name}" is verwijderd`,
      "Ongedaan maken",
      { duration: 3000 }
    );
    deleteSnackbarRef
      .afterDismissed()
      .subscribe(val => !val.dismissedByAction && confirm());
    deleteSnackbarRef.onAction().subscribe(() => reject());
  }

  formEmpty(form): boolean {
    if (form.name && form.description && form.price && form.imagePath) {
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
