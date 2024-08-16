import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Observable, tap } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authguard');

  return authService.autoLogin().pipe(
    tap({
      next: () => true,
      error: () => router.navigate(['/login']),
    }),
  );

  // if (authService.isLoggedIn()) {
  //   return true;
  // } else {
  //   router.navigate(['/login']);
  //   return false;
  // }
};
