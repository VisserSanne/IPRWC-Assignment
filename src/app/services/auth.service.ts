import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  private user = new BehaviorSubject<firebase.User>(undefined);
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  public isLoggedIn: Observable<boolean>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.isLoggedIn = this.isLoggedInSource.asObservable();
    this.firebaseAuth.user.subscribe(async user => {
      if (user) {
        this.user.next(user);
        this.token = await user.getIdToken();
        this.isLoggedInSource.next(true);
      } else {
        if (this.token) {
          this.token = undefined;
        }
        this.user.next(undefined);
        this.isLoggedInSource.next(false);
      }
    });
  }

  signup(email: string, password: string) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err.message);
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err.message);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }

  getUserSubject() {
    return this.user;
  }

  getToken() {
    return this.token;
  }

  public isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
