import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class UiService {
  public testValue!: string;
  constructor() {}
  public loading: boolean = false;
  setLoading(x: boolean) {
    this.loading = x;
  }
  toggleLoading() {
    this.loading = !this.loading;
  }
  public message!: string;
}
