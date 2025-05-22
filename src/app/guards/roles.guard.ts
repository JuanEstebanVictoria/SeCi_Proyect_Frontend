import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) return router.createUrlTree(['/login']);

  const expectedRoles = route.data['expectedRoles'];
  const userRoles = authService.getRoles();
  const hasRole = expectedRoles.some((r: string) => userRoles.includes(r));

  return hasRole ? true : router.createUrlTree(['/unauthorized']);
};
