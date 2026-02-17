import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ApiService } from '../../services/api.service';

interface Task {
  _id?: string;
  title: string;
  description: string;
  target_agent: 'claw' | 'bar' | 'noma' | 'naji';
  status: 'pending' | 'running' | 'completed' | 'failed';
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
export class TasksComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  review: Task[] = [];
  done: Task[] = [];

  isModalOpen = signal(false);
  isEditMode = signal(false);
  taskForm: FormGroup;
  currentEditingTaskId: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      target_agent: ['claw', Validators.required],
      priority: ['medium', Validators.required],
      description: ['', Validators.required],
      message: ['']
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.apiService.getTasks().subscribe((tasks: any[]) => {
      this.todo = tasks.filter((t: any) => t.status === 'pending');
      this.inProgress = tasks.filter((t: any) => t.status === 'running');
      this.done = tasks.filter((t: any) => t.status === 'completed' || t.status === 'failed');
    });
  }

  openCreateModal() {
    this.isEditMode.set(false);
    this.taskForm.reset({ target_agent: 'claw', priority: 'medium' });
    this.isModalOpen.set(true);
  }

  openEditModal(task: Task) {
    this.isEditMode.set(true);
    this.currentEditingTaskId = task._id || null;
    this.taskForm.patchValue(task);
    this.isModalOpen.set(true);
  }

  saveTask() {
    if (this.taskForm.invalid) return;

    if (this.isEditMode() && this.currentEditingTaskId) {
        this.apiService.updateTask(this.currentEditingTaskId, this.taskForm.value).subscribe(() => {
            this.loadTasks();
            this.closeModal();
        });
    } else {
        const taskData = { ...this.taskForm.value, status: 'pending' };
        this.apiService.createTask(taskData).subscribe(() => {
            this.loadTasks();
            this.closeModal();
        });
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
      const task = event.previousContainer.data[event.previousIndex];
      const newStatus = this.getStatusFromContainerId(event.container.id);
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      if (task._id) {
          this.apiService.updateTask(task._id, { status: newStatus }).subscribe(() => {
              if (newStatus === 'running') {
                  const missionMessage = `KING CLAW DIRECTIVE: ${task.title}. Agent ${task.target_agent.toUpperCase()} initiating now. Directive: ${task.message || 'Standard execution'}.`;
                  console.log(missionMessage);
                  // Discord/WhatsApp integration would trigger here
              }
          });
      }
    }
  }

  getStatusFromContainerId(id: string): string {
      if (id.includes('todo')) return 'pending';
      if (id.includes('progress')) return 'running';
      if (id.includes('done')) return 'completed';
      return 'pending';
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
