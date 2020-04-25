import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Item } from "../pages/webshop/item/Item.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class BasketService {
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject(
    undefined
  );
  public itemsObservable: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    let user = authService.user;
    if (user) {
      this.getItems(user.uid).subscribe(items => this.itemsSubject.next(items));
    }
  }

  private getItems(uid: string): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${environment.API_URL}/basket/${uid}`)
      .pipe(
        map(itemArray => itemArray.map(item => Object.assign(new Item(), item)))
      );
  }

  updateItems(uid: string, items: Item[]) {
    return this.http
      .put(`${environment.API_URL}/basket/${uid}`, items)
      .pipe(map(item => Object.assign(new Item(), item)));
  }

  createBasket(uid: string, items: Item[]) {
    return this.http
      .post(`${environment.API_URL}/basket/${uid}`, items)
      .pipe(map(item => Object.assign(new Item(), item)));
  }
}
