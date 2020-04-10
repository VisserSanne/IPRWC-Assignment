import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  test: Object;

  constructor(private dataservice: DataService) {
    this.dataservice
      .getHello()
      .subscribe(event => (this.test = event["message"]));
  }
}
