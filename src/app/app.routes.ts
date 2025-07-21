import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginSignupComponent } from "./login-signup/login-signup.component";
import { VaultComponent } from "./vault/vault.component";
import { authGuard } from "./auth.guard";
import { logoutGuard } from "./logout.guard";
import { MessageComponent } from "./message/message.component";

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "signup",
    component: LoginSignupComponent,
    data: { login: false },
  },
  {
    path: "login",
    component: LoginSignupComponent,
    data: { login: true },
  },
  {
    path: "vault",
    component: VaultComponent,
    canActivate: [authGuard],
  },
  {
    path: "logout",
    canActivate: [logoutGuard],
    component: MessageComponent
  },
];
