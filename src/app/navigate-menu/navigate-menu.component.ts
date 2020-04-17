import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-navigate-menu",
  templateUrl: "./navigate-menu.component.html",
  styleUrls: ["./navigate-menu.component.scss"]
})
export class NavigateMenuComponent implements OnInit {
  public isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  logOut() {
    this.authService.logout();
  }
}
