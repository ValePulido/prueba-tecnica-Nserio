import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeveloperWorkload } from '../models/developer-workload.model';
import { ProjectHealth } from '../models/project-health.model';
import { DeveloperDelayRisk } from '../models/developer-delay-risk.model';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeveloperWorkload(): Observable<DeveloperWorkload[]> {
    return this.http.get<DeveloperWorkload[]>(
      `${this.apiUrl}${API_ENDPOINTS.DASHBOARD.DEVELOPER_WORKLOAD}`
    );
  }

  getProjectHealth(): Observable<ProjectHealth[]> {
    return this.http.get<ProjectHealth[]>(
      `${this.apiUrl}${API_ENDPOINTS.DASHBOARD.PROJECT_HEALTH}`
    );
  }

  getDeveloperDelayRisk(): Observable<DeveloperDelayRisk[]> {
    return this.http.get<DeveloperDelayRisk[]>(
      `${this.apiUrl}${API_ENDPOINTS.DASHBOARD.DEVELOPER_DELAY_RISK}`
    );
  }
}