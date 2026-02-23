import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectHealth } from '../models/project-health.model';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProjectHealth[]> {
    return this.http.get<ProjectHealth[]>(
      `${this.apiUrl}${API_ENDPOINTS.PROJECTS.GET_ALL}`
    );
  }
}