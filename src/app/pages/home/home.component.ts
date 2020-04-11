import { Component } from "@angular/core";
import { DataService } from "src/app/data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  test: String;

  constructor(private dataservice: DataService) {
    this.dataservice.getHello().subscribe(message => (this.test = message));
  }
}
