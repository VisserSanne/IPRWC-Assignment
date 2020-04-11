import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Item } from "./pages/webshop/item/Item.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http
      .get<Item[]>(`${environment.API_URL}/items`)
      .pipe(
        map(itemArray => itemArray.map(item => Object.assign(new Item(), item)))
      );
  }
}
