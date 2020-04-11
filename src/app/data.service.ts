import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Item } from "./pages/webshop/item/Item.model";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getHello() {
    if (!environment.production) {
      console.log("hoi dev");
    }
    return this.http.get(`${environment.API_URL}/hello`);
  }

  getItems() {
    return this.http.get<Item[]>(`${environment.API_URL}/items`);
  }
}
