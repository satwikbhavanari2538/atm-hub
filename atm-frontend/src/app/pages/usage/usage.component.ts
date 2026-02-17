import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class UsageComponent {
  agentUsage: AgentUsage[] = [
    { agent: 'Claw', emoji: '👑', model: 'Gemini 3 Flash', runs: 124, computeTime: '12m 45s', estimatedCost: '$0.004' },
    { agent: 'Bar', emoji: '🏗️', model: 'Claude 3.5 Sonnet', runs: 82, computeTime: '24m 12s', estimatedCost: '$0.28' },
    { agent: 'Noma', emoji: '🔍', model: 'OpenRouter Auto', runs: 45, computeTime: '45m 30s', estimatedCost: '$0.05' },
    { agent: 'Naji', emoji: '📅', model: 'Gemini 2.5 Lite', runs: 210, computeTime: '5m 10s', estimatedCost: '$0.001' },
  ];

  totalCost = '$0.335';
  totalRuns = 461;
}
