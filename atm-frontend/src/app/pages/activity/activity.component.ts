import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface ActivityLog {
  id: string;
  timestamp: Date;
  agent: string;
  action: string;
  status: string;
  duration: string;
}

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent implements OnInit {
  logs = signal<ActivityLog[]>([]);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadActivity();
  }

  loadActivity() {
    this.apiService.getActivity().subscribe(data => {
      this.logs.set(data);
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'success': return 'bg-green-500/10 text-green-500';
      case 'warning': return 'bg-yellow-500/10 text-yellow-500';
      case 'error': return 'bg-red-500/10 text-red-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  }

  getAgentEmoji(agent: string): string {
    switch (agent.toLowerCase()) {
      case 'claw': return '👑';
      case 'bar': return '🏗️';
      case 'noma': return '🔍';
      case 'naji': return '📅';
      default: return '🤖';
    }
  }
}
