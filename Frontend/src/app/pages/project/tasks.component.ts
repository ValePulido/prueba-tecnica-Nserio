import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { ProjectService } from '../../core/services/project.service';
import { ProjectHealth } from '../../core/models/project-health.model';
import { Task } from '../../core/models/task.model';
import { DataTableComponent, TableColumn } from '../../shared/components/data-table/data-table.component';
import { CellDefDirective } from '../../shared/components/cell-def/cell-def';
import { TaskStatusChartComponent } from '../../shared/components/task-status-chart/task-status-chart.component';

@Component({
  selector: 'app-project-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    DataTableComponent,
    CellDefDirective,
    TaskStatusChartComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class ProjectTasksComponent implements OnInit {

  project: ProjectHealth | null = null;
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  developers: string[] = [];

  searchQuery = '';
  statusFilter = '';
  developerFilter = '';

  selectedTask: Task | null = null;

  private projectId!: number;

  taskColumns: TableColumn[] = [
    { key: 'title', label: 'Task', sortable: true },
    { key: 'assigneeName', label: 'Assigned', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'estimatedComplexity', label: 'Complexity', sortable: true },
    { key: 'createdAt', label: 'Creation Date', sortable: true, type: 'date' },
    { key: 'dueDate', label: 'Due Date', sortable: true, type: 'date' }
  ];

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = Number(params.get('id'));
      this.loadProject();
      this.loadTasks();
    });
  }

  private loadProject(): void {
    this.projectService.getAll().subscribe((projects: ProjectHealth[]) => {
      this.project = projects.find(p => Number(p.projectId) === this.projectId) ?? null;
    });
  }

  private loadTasks(): void {
    this.taskService.getByProject(this.projectId, '', undefined, 1, 200).subscribe(tasks => {
      this.allTasks = tasks;
      this.developers = [...new Set(tasks.map(t => t.assigneeName).filter(Boolean))];
      this.applyFilters();
    });
  }

  applyFilters(): void {
    let result = [...this.allTasks];

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(t => t.title?.toLowerCase().includes(q));
    }

    if (this.statusFilter) {
      result = result.filter(t => t.status === this.statusFilter);
    }

    if (this.developerFilter) {
      result = result.filter(t => t.assigneeName === this.developerFilter);
    }

    this.filteredTasks = result;
  }

  openDetail(task: Task): void { this.selectedTask = task; }
  closeDetail(): void { this.selectedTask = null; }

  getInitials(name: string = ''): string {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }

  getAvatarColor(name: string = ''): string {
    const colors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];
    return colors[name.charCodeAt(0) % colors.length];
  }

  isOverdue(date: string | Date | undefined): boolean {
    return date ? new Date(date) < new Date() : false;
  }

  isOverdueRow = (task: Task): boolean => {
    return this.isOverdue(task.dueDate);
  };
}