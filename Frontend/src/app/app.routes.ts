import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'projects/:id', loadComponent: () => import('./pages/project/tasks.component').then(m => m.ProjectTasksComponent) },
  { path: 'new-task', loadComponent: () => import('./pages/task-form/new-task.component').then(m => m.NewTaskComponent) },
];