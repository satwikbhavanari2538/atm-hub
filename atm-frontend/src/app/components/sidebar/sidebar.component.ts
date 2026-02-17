import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  get isCollapsed(): boolean {
    return this.sidebarService.isCollapsed();
  }

  constructor(
    private themeService: ThemeService, 
    private sidebarService: SidebarService,
    private router: Router
  ) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  logout() {
    localStorage.removeItem('atm_authenticated');
    this.router.navigate(['/login']);
  }
}
