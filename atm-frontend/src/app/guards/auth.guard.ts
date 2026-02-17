import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  const isAuthenticated = localStorage.getItem('atm_authenticated') === 'true';

  if (!isAuthenticated) {
    return router.parseUrl('/login');
  }
  return true;
};
