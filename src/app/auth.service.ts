import { inject, Injectable } from "@angular/core";
import { BaseClass } from "./base.class";
import { environment as env } from "../environments/environment";
import { BehaviorSubject } from "rxjs";
import { UiService } from "./ui.service";

interface CREDENTIALS {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseClass {
  public authenticated$ = new BehaviorSubject<boolean>(false);
  private sessionToken: string | null = null;
  private credentials: CREDENTIALS | null = null;
  private requestHeaders = new Headers({
    "Content-Type": "application/json",
    "Access-Allow-Origin": "http://localhost:4200",
  });
  protected override consoleHead = "[AUTH SERVICE]";
  constructor() {
    super();
    this.log("instantiated");
    this.checkAuthState();
  }
  public uiService = inject(UiService);
  private checkAuthState() {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      // TODO: no validation of this accessToken
      this.sessionToken = sessionToken;
      this.log("session token found from Session Storage");
      if (this.sessionToken != null && this.sessionToken !== '') {
        let sessionOk = Boolean(this.validateSession());
        this.authenticated$.next(sessionOk)
      }
      else this.authenticated$.next(false);
    } else this.authenticated$.next(false);

  }
  private validateSession() {
    let headers = this.requestHeaders;
    let sessionToken = this.sessionToken
    if (sessionToken === '') throw "No sessionToken, but validateSession called"
    headers.append("Authorization", "Session " + sessionToken!)
    return fetch(`${env.API}/validateSession`, { headers: headers })
      .then(res => res.json())
      .then(json => {
        if ("message" in json) {
          console.log(json.message)
          this.uiService.showSnackBar(json.message, "", );
          this.logout();
          return false;
        }
        return json.sessionOK
      })
  }
  private saveSessionToken(token: string) {
    sessionStorage.setItem("token", token);
    this.log("saved session token");
  }
  public initializeSession() {
    this.log("initiating session");
    return fetch(`${env.API}/initSession`, {
      headers: { ...this.requestHeaders, ...this.credentials },
    }).then((res) => res.json())
      .then((json) => {
        const sessionToken = json.sessionID;
        if (sessionToken) {
          this.sessionToken = sessionToken;
          this.saveSessionToken(sessionToken);
          this.validateSession().then(sessionOk => {
            if (sessionOk) {
              this.authenticated$.next(true);
              this.credentials = null;
            }
            else this.authenticated$.next(false);
          })
        } else throw "No session Token received";
      });
  }
  public registerUser() {
    this.log("registering user");
    return fetch(`${env.API}/register`, {
      method: "POST",
      body: JSON.stringify(this.credentials),
      headers: this.requestHeaders,
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
