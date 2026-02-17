import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Task {
  id: string;
  title: string;
  description: string;
  agent: 'claw' | 'bar' | 'noma' | 'naji';
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  todo: Task[] = [
    { id: '1', title: 'Research Angular 19', description: 'Analyze new hydration features.', agent: 'noma', priority: 'medium' },
    { id: '2', title: 'Fix Auth Pipe', description: 'Resolve token expiration bug.', agent: 'bar', priority: 'high' }
  ];

  inProgress: Task[] = [
    { id: '3', title: 'ATM Shell Build', description: 'Implement sidebar and routing.', agent: 'bar', priority: 'high' }
  ];

  review: Task[] = [];

  done: Task[] = [
    { id: '4', title: 'Setup Discord HQ', description: 'Configure channels and permissions.', agent: 'claw', priority: 'high' }
  ];

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
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

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'bg-red-500/10 text-red-500';
      case 'medium': return 'bg-yellow-500/10 text-yellow-500';
      case 'low': return 'bg-green-500/10 text-green-500';
      default: return 'bg-slate-500/10 text-slate-500';
    }
  }
}
