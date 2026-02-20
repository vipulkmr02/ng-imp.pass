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
  private _passwordService = inject(PasswordService);
  private snackBar = inject(MatSnackBar);
  passwords!: { pID: string; password: string; _id: string }[];
  visibility!: { [id: string]: boolean };
  constructor() {
    if (!environment.production) {
      this.passwords = [
        { pID: "google", password: "google", _id: "123" },
        { pID: "facebook", password: "facebook", _id: "234" },
        { pID: "github", password: "gh_token_abc", _id: "345" },
        { pID: "twitter", password: "twit@2025", _id: "456" },
        { pID: "bank", password: "Bank$ecure2025", _id: "567" },
        { pID: "work-email", password: "WorkMail!pass", _id: "678" },
      ];
    } else {
      this._passwordService.getAllPasswords().then((passwords) =>
        this.passwords = passwords
      );
    }
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
    const dialogRef = this._dialog.open(AddPasswordFormComponent,{
      "width": "500px",
      "enterAnimationDuration": 200,
      "exitAnimationDuration": 200
    })

    // Subscribe to the Output EventEmitter
    dialogRef.componentInstance.passwordAdded.subscribe((newPassword: { pID: string; password: string }) => {
      this.passwords.push({ pID: newPassword.pID, password: newPassword.password, _id: Date.now().toString() });
      this.visibility[this.passwords[this.passwords.length - 1]._id] = false;
      this.snackBar.open("Password added successfully", "OK", {
        "duration": 2000,
      })
    })
  }
}
