import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard = () => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const isAuthenticated = localStorage.getItem('atm_authenticated') === 'true';
    if (!isAuthenticated) {
      return router.parseUrl('/login');
    }
    return true;
  }
  
  // Default to true for server rendering to avoid redirects during pre-rendering
  // or handle as needed for your app.
  return true;
};
