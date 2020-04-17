import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Item } from "../pages/webshop/item/Item.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { ItemService } from "./item.service";
import { stringify } from "querystring";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  constructor(private http: HttpClient, private itemService: ItemService) {}

  dummyData = [
    new Item("1", "Amathist", "Mooie paarse steen jonguh", "/"),
    new Item("2", "Rozenkwarts", "Mooie roze steen jonguh", "/")
  ];

  getItemRefs(uid: string): Observable<string[]> {
    return this.http
      .get<{ items: string[] }>(`${environment.API_URL}/basket/${uid}`)
      .pipe(map(item => item.items));
  }
}
