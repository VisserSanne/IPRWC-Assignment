import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent {
  private user: firebase.User;

  constructor(private authService: AuthService) {
    authService.getUserSubject().subscribe(user => {
      this.user = user;
    });
  }
}
