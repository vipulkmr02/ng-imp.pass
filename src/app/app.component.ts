import { Component, inject, ViewChild } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthService } from "./auth.service";
import { UiService } from "./ui.service";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  authService = inject(AuthService);
  ui = inject(UiService);
  title = "IMP.PASS";

  @ViewChild("sidenav")
  sidenav!: MatSidenav;
}
