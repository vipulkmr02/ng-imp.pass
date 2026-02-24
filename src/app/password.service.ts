import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { BaseClass } from "./base.class";
import { environment as env } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class PasswordService extends BaseClass {
  private authService = inject(AuthService);
  private sessionToken!: string | null;
  protected override consoleHead = "[PASSWORD SERVICE]";
  private headers = { "Content-Type": "application/json" };
  constructor() {
    super();
    this.log("instantiated");
    this.sessionToken = this.authService.getSessionToken();
  }
  public getAllPasswords() {
    return this.getPassword("all")
      .then((res) => res.json())
  }
  public getPassword(pID: string) {
    return fetch(`${env.API}/password?pID=${pID}`, {
      method: "GET",
      headers: {
        Authorization: `Session ${this.sessionToken}`,
        ...this.headers,
      },
    });
  }
  public createPassword(pID: string, password: string) {
    fetch(`${env.API}/new`, {
      method: "PUT",
      body: JSON.stringify({
        pID: pID,
        password: password,
      }),
      headers: {
        Authorization: `Session ${this.sessionToken}`,
        ...this.headers,
      },
    });
  }
  public deletePassword(pID: string) {
    fetch(`${env.API}/delete?pID=${pID}`, {
      method: "GET",
      headers: {
        Authorization: `Session ${this.sessionToken}`,
        ...this.headers,
      },
    });
  }
  public updatePassword(pID: string, newPassword: string) {
    fetch(`${env.API}/update?pID=${pID}`, {
      method: "PUT",
      body: JSON.stringify({ password: newPassword }),
      headers: {
        Authorization: `Session ${this.sessionToken}`,
        ...this.headers,
      },
    });
  }
  public updatePID(pID: string, newPID: string) {
    fetch(`${env.API}/update?pID=${pID}`, {
      method: "PUT",
      body: JSON.stringify({ pID: newPID }),
      headers: {
        Authorization: `Session ${this.sessionToken}`,
        ...this.headers,
      },
    });
  }
}
