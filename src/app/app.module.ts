import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { InscriptionComponent } from "./inscription/inscription.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { UserListComponent } from "./user/user-list/user-list.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { HeaderComponent } from "./header/header.component";
import { UserService } from "./user/user.service";

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    AuthenticationComponent,
    UserListComponent,
    UserEditComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
