import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { UiService } from "./ui.service";

export const logoutGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const ui = inject(UiService);
  const router = inject(Router);

  ui.message = "You have been logged out!";
  if (auth.authenticated$) {
    auth.logout();
    return true;
  } else {
    router.navigateByUrl("");
    return false;
  }
};
