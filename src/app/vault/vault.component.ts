import { Component, inject } from "@angular/core";
import { PasswordService } from "../password.service";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { environment } from "../../environments/environment.development";
import { MatDialog } from "@angular/material/dialog";
import { AddPasswordFormComponent } from "./add-password-form/add-password-form.component";
import { MatTooltip } from "@angular/material/tooltip";
import { MatSpinner } from "@angular/material/progress-spinner";
import { UiService } from "../ui.service";

@Component({
  selector: "app-vault",
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatGridListModule,
    MatListModule,
    MatTooltip
  ],
  templateUrl: "./vault.component.html",
  styleUrl: "./vault.component.css",
})
export class VaultComponent {
  private _dialog = inject(MatDialog)
  private _uiService = inject(UiService);
  private _passwordService = inject(PasswordService);
  private snackBar = inject(MatSnackBar);
  passwords!: { pID: string; password: string; _id: string }[];
  visibility!: { [id: string]: boolean };
  constructor() {
    this._uiService.setLoading(true);
    this._passwordService.getAllPasswords().then(
      (passwords) => this.passwords = passwords
    ).finally(() => this._uiService.setLoading(false));
    this.visibility = {};
    for (const x of this.passwords) {
      this.visibility[x._id] = false;
    }
  }
  copyPasswordToClipboard(password: string) {
    window.navigator.clipboard.writeText(password)
    this.snackBar.open("Password copied to clipboard", "OK", {
      "duration": 2000,
    })
  }
  togglePasswordVisibility(id: string) {
    this.visibility[id] = !this.visibility[id];
  }
  btnAdd() {
    const dialogRef = this._dialog.open(AddPasswordFormComponent, {
      "width": "500px",
      "enterAnimationDuration": 200,
      "exitAnimationDuration": 200
    })

    // Subscribe to the Output EventEmitter
    dialogRef.componentInstance.passwordAdded.subscribe((newPassword: { pID: string; password: string }) => {
      this.passwords.push({ pID: newPassword.pID, password: newPassword.password, _id: Date.now().toString() });
      this.visibility[this.passwords[this.passwords.length - 1]._id] = false;
      this.snackBar.open("Password added successfully", "", {
        "duration": 1000,
      })
    })
  }
}
