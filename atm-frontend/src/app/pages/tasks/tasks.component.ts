import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  message?: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule, ReactiveFormsModule],
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

  isModalOpen = signal(false);
  isEditMode = signal(false);
  taskForm: FormGroup;
  currentEditingTaskId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      agent: ['claw', Validators.required],
      priority: ['medium', Validators.required],
      description: ['', Validators.required],
      message: ['']
    });
  }

  openCreateModal() {
    this.isEditMode.set(false);
    this.taskForm.reset({ agent: 'claw', priority: 'medium' });
    this.isModalOpen.set(true);
  }

  openEditModal(task: Task) {
    this.isEditMode.set(true);
    this.currentEditingTaskId = task.id;
    this.taskForm.patchValue(task);
    this.isModalOpen.set(true);
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    const taskData = this.taskForm.value;
    
    if (this.isEditMode()) {
      this.updateExistingTask(taskData);
    } else {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        ...taskData
      };
      this.todo.push(newTask);
    }

    this.closeModal();
  }

  updateExistingTask(data: any) {
    const lists = [this.todo, this.inProgress, this.review, this.done];
    for (let list of lists) {
      const index = list.findIndex(t => t.id === this.currentEditingTaskId);
      if (index > -1) {
        // If agent changed, we might want to move it to Todo? 
        // For now, just update the data in place.
        list[index] = { ...list[index], ...data };
        break;
      }
    }
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.currentEditingTaskId = null;
  }

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
