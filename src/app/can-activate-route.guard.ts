import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(route.routeConfig.path);
    if (route.routeConfig.path == "admin-page") {
      return this.isAdmin(this.authService.userRole)
        ? true
        : this.router.parseUrl("/");
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
