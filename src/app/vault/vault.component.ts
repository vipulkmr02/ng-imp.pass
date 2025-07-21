import { Component, inject } from "@angular/core";
import { PasswordService } from "../password.service";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from "@angular/material/grid-list";
import { environment } from "../../environments/environment.development";

@Component({
  selector: "app-vault",
  standalone: true,
  imports: [
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    CommonModule,
    MatGridListModule,
    MatListModule,
  ],
  templateUrl: "./vault.component.html",
  styleUrl: "./vault.component.css",
})
export class VaultComponent {
  private passwordService = inject(PasswordService);
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
      this.passwordService.getAllPasswords().then((passwords) =>
        this.passwords = passwords
      );
    }
    this.visibility = {};
    for (const x of this.passwords) {
      this.visibility[x._id] = false;
    }
  }
  toggleVisibility(id: string) {
    this.visibility[id] = !this.visibility[id];
  }
}
