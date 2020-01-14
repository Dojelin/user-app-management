import { User } from "./user.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class UserService {
  users = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<any>("https://reqres.in/api/users")
      .pipe(catchError(this.handleError));
  }

  getUser(userId: number): User {
    return this.users.value.find(user => user.id === userId);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exist already!";
        break;
      default:
        break;
    }
    return throwError(errorMessage);
  }
}
