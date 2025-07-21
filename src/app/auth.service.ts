import { Injectable } from "@angular/core";
import { BaseClass } from "./base.class";
import { environment as env } from "../environments/environment";
import { BehaviorSubject } from "rxjs";

interface CREDENTIALS {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseClass {
  public authenticated$ = new BehaviorSubject<boolean | null>(null);
  private sessionToken: string | null = null;
  private credentials: CREDENTIALS | null = null;
  private headers = {
    "Content-Type": "application/json",
    "Access-Allow-Origin": "http://localhost:4200",
  };
  protected override consoleHead = "[AUTH SERVICE]";
  constructor() {
    super();
    this.log("instantiated");
  this.checkAuthState();
  }
  private checkAuthState() {
    const accessToken = sessionStorage.getItem("token");
    this.log("no-access-token");
    if (accessToken) {
      // TODO: no validation of this accessToken
      this.sessionToken = accessToken;
      this.log("session token found from Session Storage");
      this.log(this.sessionToken);
      this.authenticated$.next(true);
    } else {
      this.authenticated$.next(false);
    }
  }
  private saveSessionToken(token: string) {
    sessionStorage.setItem("token", token);
    this.log("saved session token");
  }
  public initializeSession() {
    this.log("initiating session");
    return fetch(`${env.API}/initSession`, {
      headers: { ...this.headers, ...this.credentials },
    }).then((res) => res.json())
      .then((json) => {
        const sessionToken = json.sessionID;
        if (sessionToken) {
          this.sessionToken = sessionToken;
          this.saveSessionToken(sessionToken);
        } else throw "No session Token received";
      });
  }
  public registerUser() {
    this.log("registering user");
    return fetch(`${env.API}/register`, {
      method: "POST",
      body: JSON.stringify(this.credentials),
      headers: this.headers,
    });
  }
  public getSessionToken() {
    return this.sessionToken;
  }
  public setCredentials(creds: CREDENTIALS) {
    this.credentials = creds;
  }
  public logout() {
    this.credentials = null;
    sessionStorage.clear();
    this.authenticated$.next(false)
  }
}
