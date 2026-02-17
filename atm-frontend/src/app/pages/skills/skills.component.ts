import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  id: string;
  name: string;
  category: 'strategy' | 'development' | 'research' | 'assistant';
  description: string;
  assignedAgents: string[];
  status: 'active' | 'beta' | 'deprecated';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {
  skills: Skill[] = [
    { id: 'SKL-001', name: 'Strategic Orchestration', category: 'strategy', description: 'High-level planning and cross-agent task coordination.', assignedAgents: ['Claw'], status: 'active' },
    { id: 'SKL-002', name: 'Full-Stack Development', category: 'development', description: 'Building and maintaining web services, APIs, and UIs.', assignedAgents: ['Bar'], status: 'active' },
    { id: 'SKL-003', name: 'Market Intelligence', category: 'research', description: 'Scanning web signals for trends and data analysis.', assignedAgents: ['Noma'], status: 'active' },
    { id: 'SKL-004', name: 'System Maintenance', category: 'assistant', description: 'Log cleaning, workspace hygiene, and minor bug fixes.', assignedAgents: ['Naji'], status: 'active' },
    { id: 'SKL-005', name: 'Voice Processing', category: 'development', description: 'STT and audio synthesis integration for Android bridge.', assignedAgents: ['Bar', 'Claw'], status: 'beta' },
    { id: 'SKL-006', name: 'Automated Summarization', category: 'assistant', description: 'Generating hourly/daily digests of system activity.', assignedAgents: ['Naji', 'Noma'], status: 'active' },
  ];

  getCategoryClass(category: string): string {
    switch (category) {
      case 'strategy': return 'text-indigo-500 bg-indigo-500/10';
      case 'development': return 'text-orange-500 bg-orange-500/10';
      case 'research': return 'text-blue-500 bg-blue-500/10';
      case 'assistant': return 'text-emerald-500 bg-emerald-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'beta': return 'text-yellow-500';
      case 'deprecated': return 'text-red-500';
      default: return 'text-slate-500';
    }
  }
}
