import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Item } from "../pages/webshop/item/Item.model";
import { map, catchError, retry } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { HandleError } from "./handle-error";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  constructor(private http: HttpClient, private handleError: HandleError) {}

  getItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${environment.API_URL}/items`)
      .pipe(
        map(itemArray => itemArray.map(item => Object.assign(new Item(), item)))
      )
      .pipe(
        catchError(err => this.handleError.handleError(err))
      );
  }

  getItem(id: string): Observable<Item> {
    return this.http
      .get<Item>(`${environment.API_URL}/items/${id}`)
      .pipe(map(item => Object.assign(new Item(), item)))
      .pipe(
        catchError(err => this.handleError.handleError(err))
      );
  }

  createItem(item: Item): Observable<Item> {
    return this.http
      .post(`${environment.API_URL}/items`, item)
      .pipe(map(item => Object.assign(new Item(), item)))
      .pipe(
        catchError(err => this.handleError.handleError(err))
      );
  }

  deleteItem(id: string) {
    return this.http.delete(`${environment.API_URL}/items/${id}`).pipe(
      catchError(err => this.handleError.handleError(err))
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http
      .put(`${environment.API_URL}/items/${item.id}`, item)
      .pipe(map(item => Object.assign(new Item(), item)))
      .pipe(
        catchError(err => this.handleError.handleError(err))
      );
  }
}
