import { CanActivateFn } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";

import { filter, map } from "rxjs/operators";

export const authGuard: CanActivateFn = (route, state) =>
  inject(AuthService).authenticated$.pipe(
    filter((authenticated): authenticated is boolean => authenticated !== null),
    map((authenticated) => !!authenticated),
  );
