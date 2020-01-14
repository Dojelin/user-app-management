import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.css"]
})
export class AuthenticationComponent implements OnInit {
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).subscribe(
      responseData => {
        this.router.navigate(["/users"]);
      },
      errorMessage => {
        this.error = errorMessage;
      }
    );

    form.reset();
  }
}
