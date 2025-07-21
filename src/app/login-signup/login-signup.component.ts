import { Component, inject, OnInit } from "@angular/core";
import { BaseClass } from "../base.class";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../auth.service";
import { UiService } from "../ui.service";

@Component({
  selector: "app-login-signup",
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./login-signup.component.html",
  styleUrl: "./login-signup.component.css",
})
export class LoginSignupComponent extends BaseClass implements OnInit {
  // conditions:
  // - 8 minimum
  // - 1 uppercase
  // - 1 lowercase
  // - 1 number
  // - 1 special character
  // - no spaces
  // - no emojis or other non-ASCII characters

  public snackBarMessage!: string;
  public snackBarButton!: string;
  private snackBar = inject(MatSnackBar);
  private PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  private router = inject(Router);
  private authService = inject(AuthService);
  public visibilityStates = [false, false, false];
  login!: boolean;
  protected override consoleHead = `[${this.login ?? "LOGIN-SIGNUP"}]`;
  private ui = inject(UiService);
  signupFormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(this.PASSWORD_REGEX),
    ]),
    confirmPassword: new FormControl("", [Validators.required]),
  });
  loginFormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  ngOnInit(): void {
    this.log("initialized");
    if (/login/.test(this.router.url)) this.login = true;
    if (/signup/.test(this.router.url)) this.login = false;
    this.log(this.login ? "showing Login form" : "showing Signup form");
  }
  toggleVisibility(idx: number) {
    console.log("toggled for", idx);
    this.visibilityStates[idx] = !this.visibilityStates[idx];
  }
  passwordMismatchValidator() {
    console.log("!!!!");
    if (
      this.signupFormGroup.value.password !==
        this.signupFormGroup.value.confirmPassword
    ) {
      this.log("passwords do not match");
      this.signupFormGroup.controls.confirmPassword.setErrors({
        mismatch: true,
      });
    } else {
      if (this.signupFormGroup.controls.confirmPassword.hasError("mismatch")) {
        console.log("removing errors from confirmPassword");
        this.signupFormGroup.controls.confirmPassword.setErrors({}); // no errors
      }
    }
  }
  onSubmit(): void {
    this.log("form submitted");
    if (this.login) {
      this.log("logging in");
      const { email, password } = this.loginFormGroup.getRawValue();
      if (email && password) {
        this.authService.setCredentials({
          email: email,
          password: password,
        });
      }
      this.ui.setLoading(true);
      this.authService.initializeSession().then(() => {
      }).finally(() => {
        this.ui.setLoading(false);
        this.router.navigateByUrl("/");
      });
    } else {
      this.log("signing up");
      if (
        this.signupFormGroup.value.password !==
          this.signupFormGroup.value.confirmPassword
      ) {
        this.log("passwords do not match");
        this.signupFormGroup.controls.confirmPassword.setErrors({
          mismatch: true,
        });
        return;
      }
      if (this.signupFormGroup.invalid) {
        this.log("form is invalid");
        return;
      }
      const { email, password } = this.signupFormGroup.getRawValue();
      if (email && password) {
        this.authService.setCredentials({
          email: email,
          password: password,
        });
      }
      this.ui.setLoading(true);
      this.authService.registerUser().then(
        (res) => res.json(),
      ).then((json) => {
        this.snackBar.open(json.message, "OK", { duration: 5000 });
      }).finally(() => {
        this.ui.setLoading(false);
      });
    }
  }
}
