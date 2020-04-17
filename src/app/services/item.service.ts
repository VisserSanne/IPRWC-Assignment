import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Item } from "../pages/webshop/item/Item.model";
import { map } from "rxjs/operators";
import { from, of, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private http: HttpClient) {}

  dummyData = [
    new Item("1", "Amathist", "Mooie paarse steen jonguh", "/"),
    new Item("2", "Rozenkwarts", "Mooie roze steen jonguh", "/")
  ];

  getItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${environment.API_URL}/items`)
      .pipe(
        map(itemArray => itemArray.map(item => Object.assign(new Item(), item)))
      );
    // return of(this.dummyData);
  }

  getItem(id: string): Observable<Item> {
    return this.http
      .get<Item>(`${environment.API_URL}/items/${id}`)
      .pipe(map(item => Object.assign(new Item(), item)));
    // return of(this.dummyData.filter(item => item.id === id)[0]);
  }

  createItem(item: Item): Observable<Item> {
    this.dummyData.push(item);
    return of(item);
  }

  deleteItem(id: string): void {
    this.dummyData = this.dummyData.filter(item => item.id !== id);
  }

  updateItem(item: Item): Observable<Item> {
    const itemIndex = this.dummyData.findIndex(data => data.id === item.id);
    if (itemIndex > -1) {
      this.dummyData[itemIndex] = item;
      return of(item);
    }
    throw "Item not found";
  }
}
