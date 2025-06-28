import { Component, inject, Input, OnInit, ViewChild } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Platform, PlatformModule } from "@angular/cdk/platform";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent extends BaseComponent implements OnInit {
  platform = inject(Platform);
  @Input("title")
  TITLE!: string;

  @Input("menuItems")
  ITEMS: { name: string; href: string }[] = [];

  nameMap: { [x: string]: string } = {
    logout: "Logout",
    generator: "Password Generator",
  };
  protected override consoleHead: string = "[NAVBAR]";

  ngOnInit() {
    this.log("initialized");
  }
}
