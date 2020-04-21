import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // console.log(route.routeConfig.path);
    if (route.routeConfig.path == "admin-page") {
      return this.isAdmin(this.authService.userRole);
    } else {
      return this.authService.isAuthenticated();
    }
  }

  isAdmin(role: string): boolean {
    if (role == "admin") {
      return true;
    } else {
      return false;
    }
  }
}
