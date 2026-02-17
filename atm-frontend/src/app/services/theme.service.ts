import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.enableDarkMode();
      }
    }
  }

  toggleTheme() {
    if (this.isDarkMode()) {
      this.enableLightMode();
    } else {
      this.enableDarkMode();
    }
  }

  private enableDarkMode() {
    this.isDarkMode.set(true);
    if (typeof document !== 'undefined') {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  private enableLightMode() {
    this.isDarkMode.set(false);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
