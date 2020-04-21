import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError, BehaviorSubject } from "rxjs";
import { Item } from "../pages/webshop/item/Item.model";
import { environment } from "src/environments/environment";
import { map, filter, catchError, retry } from "rxjs/operators";
import { ItemService } from "./item.service";
import { stringify } from "querystring";
import { AuthService } from "./auth.service";
import { HandleError } from "./handle-error";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  constructor(private http: HttpClient, private handleError: HandleError) {}

  dummyData = [
    new Item("1", "Amathist", "Mooie paarse steen jonguh", 10, "/"),
    new Item("2", "Rozenkwarts", "Mooie roze steen jonguh", 100, "/")
  ];

  getItems(uid: string): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${environment.API_URL}/basket/${uid}`)
      .pipe(
        map(itemArray => itemArray.map(item => Object.assign(new Item(), item)))
      )
      .pipe(catchError(err => this.handleError.handleError(err)));
  }

  updateItems(uid: string, items: Item[]) {
    return this.http
      .put(`${environment.API_URL}/basket/${uid}`, items)
      .pipe(map(item => Object.assign(new Item(), item)))
      .pipe(catchError(err => this.handleError.handleError(err)));
  }
}
