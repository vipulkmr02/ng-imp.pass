import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-add-password-form',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './add-password-form.component.html',
  styleUrl: './add-password-form.component.css'
})
export class AddPasswordFormComponent {

}
