import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent {
  user: firebase.User;

  constructor(authService: AuthService) {
    authService.getUserSubject().subscribe(async user => {
      this.user = user;
    });
  }
}
