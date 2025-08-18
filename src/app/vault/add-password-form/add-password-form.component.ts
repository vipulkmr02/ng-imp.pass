import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-password-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-password-form.component.html',
  styleUrl: './add-password-form.component.css'
})
export class AddPasswordFormComponent {
  passwordVisibility = false;
  form = new FormGroup({
    pID: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

}
