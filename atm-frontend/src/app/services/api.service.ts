import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://frequencies-intranet-gained-monsters.trycloudflare.com';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tasks`);
  }

  createTask(task: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(taskId: string, updates: any): Observable<any> {
      return this.http.patch<any>(`${this.baseUrl}/tasks/${taskId}`, updates);
  }

  getAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/agents`);
  }

  getActivity(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/activity`);
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/`);
  }
}
