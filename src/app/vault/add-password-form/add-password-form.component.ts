import { Component, EventEmitter, inject, Output } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-add-password-form",
  standalone: true,
  imports: [
    MatIcon,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./add-password-form.component.html",
  styleUrl: "./add-password-form.component.css",
})
export class AddPasswordFormComponent {
  readonly dialogRef = inject(MatDialogRef);
  @Output()
  passwordAdded = new EventEmitter<{ pID: string; password: string }>();
  passwordVisibility = false;
  form = new FormGroup({
    pID: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  onSubmit() {
    this.dialogRef.close(this.form.value);
    this.passwordAdded.emit(
      this.form.value as { pID: string; password: string },
    );
  }
}
