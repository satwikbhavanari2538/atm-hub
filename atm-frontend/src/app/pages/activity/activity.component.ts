import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActivityLog {
  id: string;
  timestamp: Date;
  agent: 'claw' | 'bar' | 'noma' | 'naji';
  action: string;
  status: 'success' | 'warning' | 'error';
  duration: string;
}

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  logs: ActivityLog[] = [
    { id: 'ACT-001', timestamp: new Date(), agent: 'bar', action: 'Deployed Phase 3 of ATM Hub', status: 'success', duration: '2.4s' },
    { id: 'ACT-002', timestamp: new Date(Date.now() - 3600000), agent: 'claw', action: 'Verified security handshake for Discord', status: 'success', duration: '0.8s' },
    { id: 'ACT-003', timestamp: new Date(Date.now() - 7200000), agent: 'noma', action: 'Market research for real-time charting', status: 'warning', duration: '12.1s' },
    { id: 'ACT-004', timestamp: new Date(Date.now() - 86400000), agent: 'naji', action: 'Cleaned up project intakes in Brains folder', status: 'success', duration: '5.2s' },
    { id: 'ACT-005', timestamp: new Date(Date.now() - 172800000), agent: 'bar', action: 'Database connection failed: Timeout', status: 'error', duration: '30s' },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'success': return 'bg-green-500/10 text-green-500';
      case 'warning': return 'bg-yellow-500/10 text-yellow-500';
      case 'error': return 'bg-red-500/10 text-red-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  }

  getAgentEmoji(agent: string): string {
    switch (agent) {
      case 'claw': return '👑';
      case 'bar': return '🏗️';
      case 'noma': return '🔍';
      case 'naji': return '📅';
      default: return '🤖';
    }
  }
}
