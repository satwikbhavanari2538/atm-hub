import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface AgentUsage {
  agent: string;
  emoji: string;
  model: string;
  runs: number;
  computeTime: string;
  estimatedCost: string;
}

@Component({
  selector: 'app-usage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usage.component.html',
  styleUrl: './usage.component.css'
})
export class UsageComponent implements OnInit {
  agentUsage = signal<AgentUsage[]>([]);
  totalCost = signal('$0.00');
  totalRuns = signal(0);

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.refreshMetrics();
  }

  refreshMetrics() {
    // Initializing with static squad data for UI layout, then would pull live.
    this.agentUsage.set([
      { agent: 'Claw', emoji: '👑', model: 'Gemini 3 Flash', runs: 0, computeTime: '0s', estimatedCost: '$0.00' },
      { agent: 'Bar', emoji: '🏗️', model: 'Claude 3.5 Sonnet', runs: 0, computeTime: '0s', estimatedCost: '$0.00' },
      { agent: 'Noma', emoji: '🔍', model: 'OpenRouter Auto', runs: 0, computeTime: '0s', estimatedCost: '$0.00' },
      { agent: 'Naji', emoji: '📅', model: 'Gemini 2.5 Lite', runs: 0, computeTime: '0s', estimatedCost: '$0.00' },
    ]);
  }
}
