import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(true); // Default to dark

  constructor() {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      this.isDarkMode.set(storedTheme === 'dark' || (!storedTheme && prefersDark));
      
      // Reactive effect to update DOM
      effect(() => {
        this.applyTheme(this.isDarkMode());
      });
    }
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }

  private applyTheme(isDark: boolean) {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (isDark) {
        root.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}
