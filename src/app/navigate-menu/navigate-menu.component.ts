import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-navigate-menu",
  templateUrl: "./navigate-menu.component.html",
  styleUrls: ["./navigate-menu.component.scss"]
})
export class NavigateMenuComponent implements OnInit {
  public isLoggedIn = false;

  private user: firebase.User;
  public role: string;

  constructor(private authService: AuthService) {
    authService.getUserSubject().subscribe(async user => {
      this.user = user;
      if (user) {
        await authService
          .getRole(this.user.uid)
          .subscribe(userRole => (this.role = userRole));
      } else {
        this.role = "user";
      }
    });
  }

  ngOnInit() {
    this.authService.isLoggedInObservable.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  logOut() {
    this.authService.logout();
  }
}
