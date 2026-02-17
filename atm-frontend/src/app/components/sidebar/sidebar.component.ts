import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private themeService: ThemeService, private router: Router) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    localStorage.removeItem('atm_authenticated');
    this.router.navigate(['/login']);
  }
}
