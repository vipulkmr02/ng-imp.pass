import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-add-new-password',
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
  templateUrl: './add-new-password.component.html',
  styleUrl: './add-new-password.component.css'
})
export class AddNewPasswordComponent {
  PasswordService: PasswordService = inject(PasswordService);
  passwordForm: FormGroup = new FormGroup({
    passwordIdentifier: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })
  passwordVisible = false
  toggleVisibility() { this.passwordVisible = !this.passwordVisible }

  submit() {
    var passwordIdentifier = this.passwordForm.get<string>("passwordIdentifier")?.value;
    var password = this.passwordForm.get("password")?.value;
    console.log(`saving ${passwordIdentifier}`);
    if (passwordIdentifier != null && password != null)
      this.PasswordService.createPassword(passwordIdentifier, password)
    else
      throw "null information received";
  }
}
