import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { ApplicationUser } from "./applicationUser.model";
import { Router } from "@angular/router";

export interface AuthUserData {
  id?;
  token?: string;
  email?: string;
  password?: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  user = new BehaviorSubject<ApplicationUser>(null);

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthUserData>("https://reqres.in/api/login", {
        email,
        password
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(email, responseData.token);
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(["/auth"]);

    localStorage.removeItem("userData");
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";

    if (errorResponse.error || errorResponse.error.error) {
      return throwError(errorResponse.error.error);
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, token: string) {
    const user = new ApplicationUser(email, token);

    this.user.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      id: string;
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      return;
    }

    const loadedUser = new ApplicationUser(userData.email, userData._token);

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  // Inscription
  inscription(email: string, password: string) {
    return this.http
      .post<AuthUserData>("https://reqres.in/api/register", {
        email,
        password
      })
      .pipe(
        catchError(this.handleError),
        tap(responseData => {
          this.handleAuthentication(email, responseData.token);
        })
      );
  }
}
