import { Component, inject, Input, OnInit } from "@angular/core";
import { BaseComponent } from "../base.component";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]).{8,}$/

@Component({
  selector: "app-login-signup",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./login-signup.component.html",
  styleUrl: "./login-signup.component.css",
})
export class LoginSignupComponent extends BaseComponent implements OnInit {
  private router = inject(Router);
  login!: boolean;
  protected override consoleHead = `[${this.login ?? "LOGIN-SIGNUP"}]`;
  signupFormGroup = new FormGroup({
    email: new FormControl("",  [Validators.email, Validators.required]),
    password: new FormControl("",  [Validators.required, Validators.pattern(PASSWORD_REGEX)]),
    confirmPassword: new FormControl("",  [Validators.required]),
  });
  loginFormGroup = new FormGroup({
    email: new FormControl("",  [Validators.email, Validators.required]),
    password: new FormControl("",  [Validators.required]),
  });
  ngOnInit(): void {
    this.log("initialized");
    if (/login/.test(this.router.url)) this.login = true;
    if (/signup/.test(this.router.url)) this.login = false;
    this.log(this.login ? "showing Login form" : "showing Signup form");
  }
}
