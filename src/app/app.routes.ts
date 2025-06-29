import { Routes } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { LoginSignupComponent } from "./login-signup/login-signup.component";

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
];
