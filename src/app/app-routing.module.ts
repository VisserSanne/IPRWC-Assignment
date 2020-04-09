import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./pages/home/home.component";
import { WebshopComponent } from "./pages/webshop/webshop.component";
import { GemstoneFunctionsComponent } from "./pages/gemstone-functions/gemstone-functions.component";
import { LoginComponent } from "./pages/login/login.component";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/homepage",
    pathMatch: "full"
  },
  {
    path: "homepage",
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
