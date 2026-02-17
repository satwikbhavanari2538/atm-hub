import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { UsageComponent } from './pages/usage/usage.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'usage', component: UsageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
