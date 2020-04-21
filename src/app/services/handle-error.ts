import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class HandleError {
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      if (error.status == 200) {
        console.log("all good");
        return;
      }
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }
}
