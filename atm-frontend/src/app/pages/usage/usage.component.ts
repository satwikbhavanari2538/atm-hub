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
    // Logic for usage metrics will be implemented in Phase 7
    // For now, initializing with empty live data
  }
}
