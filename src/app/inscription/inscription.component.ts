import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../authentication/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-inscription",
  templateUrl: "./inscription.component.html",
  styleUrls: ["./inscription.component.css"]
})
export class InscriptionComponent implements OnInit {
  inscriptionForm: FormGroup;
  error: string;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const form = this.inscriptionForm;
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    const repassword = form.value.repassword;

    if (password === repassword) {
      this.authService.inscription(email, password).subscribe(
        responseData => {
          this.router.navigate(["/users"]);
        },
        errorMessage => {
          this.error = errorMessage;
        }
      );

      form.reset();
      this.error = null;
    } else {
      this.error = "Password must be identical";
    }
  }

  private initForm() {
    let email = "";
    let password = "";
    let repassword = "";

    this.inscriptionForm = new FormGroup({
      email: new FormControl(email, Validators.email),
      password: new FormControl(
        password
        // Validators.pattern("(.*[a-z].*)(.*[A-Z].*)")
      ),
      repassword: new FormControl(repassword)
    });
  }
}
