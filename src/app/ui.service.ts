import { inject, Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class UiService {
  public testValue!: string;
  snackBar = inject(MatSnackBar);
  constructor() { }
  public loading: boolean = false;
  setLoading(x: boolean) {
    this.loading = x;
  }
  toggleLoading() {
    this.loading = !this.loading;
  }
  public message!: string;
  public defaultSnackbarTimeout = 5000;
  public showSnackBar(
    message: string,
    action: string = "",
    opts: MatSnackBarConfig = { duration: this.defaultSnackbarTimeout }) {
    if (!("duration" in opts)) opts.duration = this.defaultSnackbarTimeout;
    this.snackBar.open(message, action, opts);
  }
}
