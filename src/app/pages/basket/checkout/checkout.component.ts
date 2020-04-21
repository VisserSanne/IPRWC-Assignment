import { Component, ViewChild } from "@angular/core";
import { BasketService } from "src/app/services/basket.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent {
  @ViewChild("form", { static: true }) form;
  succes: boolean = false;
  user: firebase.User;

  constructor(authService: AuthService, private basketService: BasketService) {
    authService.getUserSubject().subscribe(user => (this.user = user));
  }

  onSubmit() {
    this.succes = true;
    console.log(this.user.uid);
    this.basketService.updateItems(this.user.uid, []).subscribe();
  }
}
