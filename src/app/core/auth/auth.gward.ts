import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";


export const AuthGward: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}