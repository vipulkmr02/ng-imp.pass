import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavbarComponent } from "./navbar/navbar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [MatToolbarModule, NavbarComponent, RouterModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "Imp.Pass";
}
