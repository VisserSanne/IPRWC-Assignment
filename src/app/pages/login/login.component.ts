import { Component, OnInit, OnChanges, ViewChild } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { interval } from "rxjs";
import { BasketService } from "src/app/services/basket.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public isLoggedIn = false;
  @ViewChild("form", { static: true }) formValues;

  constructor(
    private authService: AuthService,
    private basketService: BasketService
  ) {}

  ngOnInit() {
    this.authService.isLoggedInObservable.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  signup(form) {
    this.authService.signup(form.email, form.password);
    let intervalID = setInterval(() => {
      this.authService.createUserDB(this.authService.user.uid).subscribe();
      this.basketService
        .createBasket(this.authService.user.uid, [])
        .subscribe();
      clearInterval(intervalID);
    }, 3000);
  }

  submit(form) {
    this.authService.login(form.email, form.password);
  }

  logout() {
    this.authService.logout();
  }
}
