import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'King Claw';
  showSidebar = true;

  constructor(private router: Router, private sidebarService: SidebarService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Check if current URL starts with /login
      this.showSidebar = !event.urlAfterRedirects.includes('/login');
    });
  }

  get isCollapsed() {
    return this.sidebarService.isCollapsed();
  }
}
