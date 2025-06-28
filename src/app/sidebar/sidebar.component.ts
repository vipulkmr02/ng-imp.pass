import { Component, Input, OnInit } from "@angular/core";
import { BaseComponent } from "../base.component";

interface Item {
  name: string;
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent extends BaseComponent implements OnInit {
  @Input("items")
  items: Item[] = [];

  @Input("title")
  title!: string;

  protected override consoleHead = "[SIDEBAR]";
  ngOnInit(): void {
    this.log("initialized");
  }
}
