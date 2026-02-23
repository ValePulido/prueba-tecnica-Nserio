import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../../core/services/dashboard.service';
import { DeveloperWorkload } from '../../core/models/developer-workload.model';
import { ProjectHealth } from '../../core/models/project-health.model';
import { DeveloperDelayRisk } from '../../core/models/developer-delay-risk.model';
import { DataTableComponent, TableColumn } from '../../shared/components/data-table/data-table.component';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DataTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  workload: DeveloperWorkload[] = [];
  projectHealth: ProjectHealth[] = [];
  delayRisk: DeveloperDelayRisk[] = [];

  get totalTasks(): number {
    return this.projectHealth.reduce((s, p) => s + (p.totalTasks ?? 0), 0);
  }
  get inProgressTasks(): number {
    return this.projectHealth.reduce((s, p) => s + (p.openTasks ?? 0), 0);
  }
  get atRiskTasks(): number {
    return this.delayRisk.filter(d => d.highRiskFlag === 1).length;
  }
  get totalDevelopers(): number {
    return this.workload.length;
  }
  get atRiskCount(): number {
    return this.delayRisk.filter(d => d.highRiskFlag === 1).length;
  }

  workloadColumns: TableColumn[] = [
    { key: 'developerName', label: 'Developer', sortable: true },
    { key: 'openTasksCount', label: 'Open Tasks', sortable: true },
    { key: 'averageEstimatedComplexity', label: 'Avg Complexity', sortable: true },
  ];

  projectColumns: TableColumn[] = [
    { key: 'projectName', label: 'Project', sortable: true },
    { key: 'projectName', label: 'Client', sortable: false },
    { key: 'totalTasks', label: 'Total Tasks', sortable: true },
    { key: 'openTasks', label: 'Open', sortable: true },
    { key: 'completedTasks', label: 'Completed', sortable: true },
  ];

  riskColumns: TableColumn[] = [
    { key: 'developerName', label: 'Developer', sortable: true },
    { key: 'openTasksCount', label: 'Open Tasks', sortable: true },
    { key: 'avgDelayDays', label: 'Avg Delay (days)', sortable: true },
    { key: 'nearestDueDate', label: 'Nearest Due', sortable: false, type: 'date' },
    { key: 'latestDueDate', label: 'Latest Due', sortable: false, type: 'date' },
    { key: 'predictedCompletionDate', label: 'Predicted Completion', sortable: false, type: 'date' },
    { key: 'highRiskFlag', label: 'Risk Level', sortable: true },
  ];

  highlightWorkload = (row: DeveloperWorkload) => (row.openTasksCount ?? 0) >= 5;
  highlightProject = (row: ProjectHealth) => (row.openTasks ?? 0) > (row.completedTasks ?? 0);
  highlightRisk = (row: DeveloperDelayRisk) => row.highRiskFlag === 1;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dashboardService.getDeveloperWorkload().subscribe(data => this.workload = data);
    this.dashboardService.getProjectHealth().subscribe(data => this.projectHealth = data);
    this.dashboardService.getDeveloperDelayRisk().subscribe(data => this.delayRisk = data);
  }

  onProjectClick(row: ProjectHealth): void {
    if (row.projectId) {
      this.router.navigate(['/projects', row.projectId]);
    }
  }
}