import { Component, ViewChild, OnInit, ElementRef, Input } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Item } from "../webshop/item/Item.model";
import { ItemService } from "src/app/services/item.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  @ViewChild("form", { static: true }) formValues;
  user: firebase.User;
  items: Item[] = [];
  file: any = null;

  @ViewChild("fileInput", { static: false })
  fileInput: ElementRef;
  constructor(
    authService: AuthService,
    private itemService: ItemService,
    private _snackBar: MatSnackBar
  ) {
    authService.getUserSubject().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.itemService.itemsObservable.subscribe(items => (this.items = items));
  }

  onSubmit(form) {
    const item = new Item(
      "-1",
      form.name,
      form.description,
      form.price,
      form.imagePath
    );
    this.itemService.createItem(item).subscribe(
      item => {
        this.itemService
          .uploadImage(item.id, this.file)
          .subscribe(() => console.log("success"));
        this._snackBar.open(`"${item.name}" aangemaakt`, null, {
          duration: 3000
        });
        this.formValues.resetForm();

        this.fileInput.nativeElement.value = "";
        this.file = null;
      },
      () =>
        this._snackBar.open(
          `"Aanmaken van ${item.name} mislukt, probeer opnieuw"`,
          null,
          { duration: 3000 }
        )
    );
  }
  onFileChanged(event) {
    this.file = event.target.files[0];
  }
  uploadTest() {
    this.itemService
      .uploadImage(999, this.file)
      .subscribe(() => console.log("success"));
  }
}
