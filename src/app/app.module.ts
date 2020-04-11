import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavigateMenuComponent } from "./navigate-menu/navigate-menu.component";
import { HomeComponent } from "./pages/home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { WebshopComponent } from "./pages/webshop/webshop.component";
import { GemstoneFunctionsComponent } from "./pages/gemstone-functions/gemstone-functions.component";
import { ItemComponent } from "./pages/webshop/item/item.component";
import { LoginComponent } from "./pages/login/login.component";
import { ItemService } from "./item.service";
import { Four0FourComponent } from "./pages/404/404.component";

@NgModule({
  declarations: [
    AppComponent,
    NavigateMenuComponent,
    HomeComponent,
    WebshopComponent,
    GemstoneFunctionsComponent,
    ItemComponent,
    LoginComponent,
    Four0FourComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
