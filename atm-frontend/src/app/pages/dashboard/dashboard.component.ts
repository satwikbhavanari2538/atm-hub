import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  agentCount = signal(4);
  taskCount = signal(0);
  failureCount = signal(0);
  throughput = signal(0);
  isOnline = signal(false);
  private refreshInterval: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.refreshData();
    this.refreshInterval = setInterval(() => this.refreshData(), 10000); // 10s polling for "live" feel
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  refreshData() {
    this.apiService.getStatus().subscribe({
      next: (res) => {
        this.isOnline.set(true);
      },
      error: () => this.isOnline.set(false)
    });

    this.apiService.getTasks().subscribe({
      next: (tasks: any[]) => {
        this.taskCount.set(tasks.length);
        const failures = tasks.filter(t => t.status === 'failed').length;
        this.failureCount.set(failures);
      },
      error: (err) => console.error('Dashboard Tasks failed', err)
    });

    this.apiService.getAgents().subscribe({
      next: (agents: any[]) => {
        this.agentCount.set(agents.length || 4);
      },
      error: (err) => console.error('Dashboard Agents failed', err)
    });
  }
}
