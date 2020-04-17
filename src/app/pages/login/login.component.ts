import { Component, OnInit, OnChanges } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public isLoggedIn = false;

  email: string;
  password: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = "";
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = "";
  }

  logout() {
    this.authService.logout();
  }
}
