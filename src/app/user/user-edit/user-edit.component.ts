import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  id: number;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params["id"]);
      this.initForm();
    });
  }

  onCancel() {
    this.router.navigate(["/users"]);
  }

  private initForm() {
    let userId = null;
    let userEmail = "";
    let userName = "";
    let userLastName = null;

    const user = this.userService.users.value.find(
      singleUser => singleUser.id === this.id
    );

    userId = user.id;
    userEmail = user.email;
    userName = user.first_name;
    userLastName = user.last_name;

    this.userForm = new FormGroup({
      id: new FormControl(userId, Validators.required),
      email: new FormControl(userEmail, [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl(userName, Validators.required),
      lastName: new FormControl(userLastName, Validators.required)
    });
  }
}
