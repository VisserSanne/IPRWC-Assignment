import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigateMenuComponent } from "./navigate-menu/navigate-menu.component";
import { HomeComponent } from "./pages/home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { WebshopComponent } from "./pages/webshop/webshop.component";
import { GemstoneFunctionsComponent } from "./pages/gemstone-functions/gemstone-functions.component";
import { ItemComponent } from "./pages/webshop/item/item.component";
import { LoginComponent } from "./pages/login/login.component";
import { ItemService } from "./services/item.service";
import { Four0FourComponent } from "./pages/404/404.component";
import { BasketComponent } from "./pages/basket/basket.component";
import { AuthService } from "./services/auth.service";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule } from "@angular/forms";
import { AccountComponent } from "./pages/account/account.component";
import { TokenInterceptor } from "./services/token.interceptor";
import { BasketService } from "./services/basket.service";
import { MaterialModule } from "./Material.module";
import { AdminComponent } from "./pages/admin/admin.component";
import { CanActivateRouteGuard } from "./can-activate-route.guard";
import { EditItemComponent } from "./pages/admin/edit-item/edit-item.component";
import { HandleError } from "./services/handle-error";
import { CheckoutComponent } from "./pages/basket/checkout/checkout.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigateMenuComponent,
    HomeComponent,
    WebshopComponent,
    GemstoneFunctionsComponent,
    ItemComponent,
    LoginComponent,
    Four0FourComponent,
    BasketComponent,
    AccountComponent,
    AdminComponent,
    EditItemComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    ItemService,
    AuthService,
    BasketService,
    HandleError,
    CanActivateRouteGuard,
    TokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
