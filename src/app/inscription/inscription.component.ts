import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.css"]
})
export class InscriptionComponent implements OnInit {
  error: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.authService.inscription(email, password).subscribe(
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
