import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  agentId: string;
  text: string;
  timestamp: Date;
}

interface ChatAgent {
  id: string;
  name: string;
  emoji: string;
  role: string;
  online: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  agents: ChatAgent[] = [
    { id: 'claw', name: 'CLAW', emoji: '👑', role: 'Lead Strategist', online: true },
    { id: 'bar', name: 'BAR', emoji: '🏗️', role: 'Developer', online: true },
    { id: 'noma', name: 'NOMA', emoji: '🔍', role: 'Researcher', online: true },
    { id: 'naji', name: 'NAJI', emoji: '📅', role: 'Assistant', online: true },
  ];

  selectedAgentId = signal<string>('claw');
  newMessage = '';
  messages: Message[] = [
    { id: '1', sender: 'agent', agentId: 'claw', text: 'Tactical link established with King Claw. How can I assist, Satwik?', timestamp: new Date() }
  ];

  private apiService = inject(ApiService);

  get selectedAgent() {
    return this.agents.find(a => a.id === this.selectedAgentId());
  }

  get filteredMessages() {
    return this.messages.filter(m => m.agentId === this.selectedAgentId());
  }

  ngOnInit() {
    this.refreshAgentStatus();
  }

  refreshAgentStatus() {
    this.apiService.getAgents().subscribe({
      next: (liveAgents: any[]) => {
        if (liveAgents && liveAgents.length > 0) {
          this.agents.forEach(a => {
            const live = liveAgents.find((la: any) => la.agent_id === a.id);
            if (live) a.online = live.is_online;
          });
        }
      },
      error: (err) => console.error('Chat agents failed', err)
    });
  }

  selectAgent(id: string) {
    this.selectedAgentId.set(id);
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      agentId: this.selectedAgentId(),
      text: this.newMessage,
      timestamp: new Date()
    };

    this.messages.push(userMsg);
    const directiveText = this.newMessage;
    this.newMessage = '';

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentId: this.selectedAgentId(),
        text: `DIRECTIVE RECEIVED: "${directiveText}". Synchronizing with King Claw Core.`,
        timestamp: new Date()
      };
      this.messages.push(response);
    }, 1000);
  }
}
