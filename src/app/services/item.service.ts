import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Item } from "../pages/webshop/item/Item.model";
import { map, catchError, retry, share } from "rxjs/operators";
import { of, Observable, BehaviorSubject } from "rxjs";
import { debounce } from "../utils/debounce";
import { sortSafe } from "../utils/array";

@Injectable({
  providedIn: "root"
})
export class ItemService {
  private itemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject([]);
  private _itemsObservable: Observable<
    Item[]
  > = this.itemsSubject.asObservable();
  public get itemsObservable() {
    this.debouncedUpdateSubject();

    return this._itemsObservable;
  }

  private _items = [];

  set Items(value: Item[]) {
    this.itemsSubject.next((this._items = this.sortItem(value)));
  }
  get Items(): Item[] {
    return this._items;
  }

  constructor(private http: HttpClient) {
    this.getItems().subscribe(items => (this.Items = items));
  }

  private getItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>(`${environment.API_URL}/items`)
      .pipe(
        map(itemArray => itemArray.map(item => Object.assign(new Item(), item)))
      );
  }

  getItem(id: string) {
    this.http
      .get<Item>(`${environment.API_URL}/items/${id}`)
      .pipe(map(item => Object.assign(new Item(), item)))
      .subscribe(_ => this.debouncedUpdateSubject());
  }

  createItem(item: Item) {
    const previousState = [...this.Items];
    this.Items = [...this.Items, item];
    const observable = this.http
      .post(`${environment.API_URL}/items`, item)
      .pipe(
        map(item => Object.assign(new Item(), item)),
        share()
      );
    observable.subscribe(
      _ => this.debouncedUpdateSubject(),
      error => this.globalErrorHandler(previousState)
    );
    return observable;
  }

  deleteItem(id: string) {
    const previousState = [...this.Items];
    this.Items = this.Items.filter(item => item.id !== id);
    this.http.delete(`${environment.API_URL}/items/${id}`).subscribe(
      _ => this.debouncedUpdateSubject(),
      error => this.globalErrorHandler(previousState)
    );
  }

  deleteItemAsync(id: string) {
    const previousState = [...this.Items];
    this.Items = this.Items.filter(item => item.id !== id);
    const confirm = () =>
      this.http.delete(`${environment.API_URL}/items/${id}`).subscribe(
        _ => this.debouncedUpdateSubject(),
        error => this.globalErrorHandler(previousState)
      );
    const reject = () => {
      this.Items = previousState;
    };
    return { confirm, reject };
  }

  updateItem(newItem: Item) {
    const previousState = [...this.Items];
    this.Items = [
      ...this.Items.filter(item => item.id !== newItem.id),
      newItem
    ];
    this.http
      .put(`${environment.API_URL}/items/${newItem.id}`, newItem)
      .pipe(map(item => Object.assign(new Item(), item)))
      .subscribe(
        _ => this.debouncedUpdateSubject(),
        error => this.globalErrorHandler(previousState)
      );
  }

  uploadImage(id, image) {
    const uploadData = new FormData();
    uploadData.append("imageFile", image, image.name);
    return this.http.post(
      `${environment.API_URL}/items/${id}/uploadImage`,
      uploadData
    );
  }

  private updateSubject() {
    this.getItems().subscribe(val => (this.Items = val));
  }
  private debouncedUpdateSubject = debounce(
    () => this.updateSubject(),
    1000,
    false
  );

  private globalErrorHandler(previousState: Item[]): void {
    //revert state on error
    this.Items = previousState;
  }

  private sortItem = (arr: Item[]) =>
    sortSafe(arr, (a, b) => a.name.localeCompare(b.name, ["nl", "en"]));
}
