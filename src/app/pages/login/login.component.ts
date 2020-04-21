import { Component, OnInit, OnChanges, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public isLoggedIn = false;
  @ViewChild("form", { static: true }) formValues;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedInObservable.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  signup(form) {
    this.authService.signup(form.email, form.password);
    this.formValues.resetForm();
  }

  submit(form) {
    this.authService.login(form.email, form.password);
    this.formValues.resetForm();
  }

  logout() {
    this.authService.logout();
  }
}
