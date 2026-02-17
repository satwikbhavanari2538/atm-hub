import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface Agent {
  agent_id: string;
  name: string;
  emoji: string;
  role: string;
  model: string;
  is_online: boolean;
  latency?: string;
  capacity?: string;
  stack?: string;
  focus?: string;
  schedule?: string;
  load?: string;
}

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css'
})
export class AgentsComponent implements OnInit, OnDestroy {
  agents = signal<Agent[]>([
    { agent_id: 'claw', name: 'CLAW', emoji: '👑', role: 'Lead Strategist', model: 'GEMINI 3 FLASH', is_online: true, latency: '44MS', capacity: '4 Concurrent', load: '0/4' },
    { agent_id: 'bar', name: 'BAR', emoji: '🏗️', role: 'Full-Stack Build', model: 'CLAUDE 3.5 SONNET', is_online: true, stack: 'DIGITALOCEAN', load: '85%' },
    { agent_id: 'noma', name: 'NOMA', emoji: '🔍', role: 'Neural Researcher', model: 'OPENROUTER AUTO', is_online: true, focus: 'WEB/MARKET', load: 'READY' },
    { agent_id: 'naji', name: 'NAJI', emoji: '📅', role: 'Personal Liaison', model: 'GEMINI 2.5 LITE', is_online: true, schedule: 'NEXT SYNC: 16:00', load: 'OPTIMAL' },
  ]);
  private interval: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAgentStatus();
    this.interval = setInterval(() => this.loadAgentStatus(), 10000);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  loadAgentStatus() {
    this.apiService.getAgents().subscribe({
        next: (liveAgents: any[]) => {
            if (liveAgents && liveAgents.length > 0) {
                const currentAgents = this.agents();
                const updated = currentAgents.map(a => {
                    const live = liveAgents.find((la: any) => la.agent_id === a.agent_id);
                    return live ? { ...a, is_online: live.is_online } : a;
                });
                this.agents.set(updated);
            }
        },
        error: (err) => console.error('Failed to load agents', err)
    });
  }
}
