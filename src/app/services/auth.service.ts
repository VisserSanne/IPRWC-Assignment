import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HandleError } from "./handle-error";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  private userObjectSubject = new BehaviorSubject<firebase.User>(undefined);
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  public isLoggedInObservable = this.isLoggedInSource.asObservable();
  user: firebase.User = undefined;
  userRole: string = undefined;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private http: HttpClient,
    private handleError: HandleError
  ) {
    this.firebaseAuth.user.subscribe(async user => {
      if (user) {
        this.userRole = await this.getRole(user.uid).toPromise();
        this.userObjectSubject.next(user);
        this.token = await user.getIdToken();
        this.isLoggedInSource.next(true);
      } else {
        if (this.token) {
          this.token = undefined;
        }
        this.userObjectSubject.next(undefined);
        this.isLoggedInSource.next(false);
      }
      this.user = user;
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
    return this.userObjectSubject;
  }

  getToken() {
    return this.token;
  }

  public isAuthenticated(): boolean {
    if (this.user) {
      return true;
    }
    return false;
  }

  public getRole(uid: string): Observable<string> {
    return this.http
      .get(`${environment.API_URL}/users/${uid}`, {
        responseType: "text"
      })
      .pipe(
        catchError(err => this.handleError.handleError(err))
      );
  }
}
