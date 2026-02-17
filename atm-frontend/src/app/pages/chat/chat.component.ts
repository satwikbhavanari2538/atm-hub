import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    { id: '1', sender: 'agent', agentId: 'claw', text: 'Tactical link established. How can I assist, Satwik?', timestamp: new Date() }
  ];

  get selectedAgent() {
    return this.agents.find(a => a.id === this.selectedAgentId());
  }

  get filteredMessages() {
    return this.messages.filter(m => m.agentId === this.selectedAgentId());
  }

  ngOnInit() {
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
    this.newMessage = '';

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        agentId: this.selectedAgentId(),
        text: `Received directive: "${userMsg.text}". Processing...`,
        timestamp: new Date()
      };
      this.messages.push(response);
    }, 1000);
  }
}
