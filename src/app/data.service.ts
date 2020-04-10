import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

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
}
