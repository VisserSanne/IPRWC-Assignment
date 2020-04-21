import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./pages/home/home.component";
import { WebshopComponent } from "./pages/webshop/webshop.component";
import { GemstoneFunctionsComponent } from "./pages/gemstone-functions/gemstone-functions.component";
import { LoginComponent } from "./pages/login/login.component";
import { Four0FourComponent } from "./pages/404/404.component";
import { AccountComponent } from "./pages/account/account.component";
import { BasketComponent } from "./pages/basket/basket.component";
import { AdminComponent } from "./pages/admin/admin.component";
import { CanActivateRouteGuard } from "./can-activate-route.guard";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "webshop",
    component: WebshopComponent
  },
  {
    path: "gemstone-functions",
    component: GemstoneFunctionsComponent
  },
  {
    path: "loginpage",
    component: LoginComponent
  },
  {
    path: "account",
    component: AccountComponent,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: "admin-page",
    component: AdminComponent,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: "shopping-basket",
    component: BasketComponent,
    canActivate: [CanActivateRouteGuard]
  },
  {
    path: "**",
    component: Four0FourComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
