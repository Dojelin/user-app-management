import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./user/user-list/user-list.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { InscriptionComponent } from "./inscription/inscription.component";

const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  {
    path: "inscription",
    component: InscriptionComponent
  },
  {
    path: "users",
    component: UserListComponent
  },
  {
    path: "edit-user/:id",
    component: UserEditComponent
  },
  { path: "auth", component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
