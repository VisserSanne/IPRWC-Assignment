import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Item } from "../pages/webshop/item/Item.model";
import { environment } from "src/environments/environment";
import { map, catchError, retry } from "rxjs/operators";
import { HandleError } from "./handle-error";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  constructor(private http: HttpClient, private handleError: HandleError) {}

  getItems(uid: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${environment.API_URL}/basket/${uid}`).pipe(
      map(itemArray => itemArray.map(item => Object.assign(new Item(), item))),
      catchError(err => this.handleError.handleError(err))
    );
  }

  updateItems(uid: string, items: Item[]) {
    console.log(items);
    return this.http.put(`${environment.API_URL}/basket/${uid}`, items).pipe(
      map(item => Object.assign(new Item(), item)),
      catchError(err => this.handleError.handleError(err))
    );
  }
}
