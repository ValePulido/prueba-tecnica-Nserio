import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { CreateTask } from '../models/createTask';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../../core/constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getByProject(
    projectId: number,
    status?: string,
    assigneeId?: number,
    page = 1,
    pageSize = 10
  ): Observable<Task[]> {

    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    if (status) {
      params = params.set('status', status);
    }

    if (assigneeId) {
      params = params.set('assigneeId', assigneeId);
    }

    return this.http.get<Task[]>(
      `${this.apiUrl}${API_ENDPOINTS.TASKS.GET_BY_PROJECT(projectId)}`,
      { params }
    );
  }

  create(task: CreateTask): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${API_ENDPOINTS.TASKS.CREATE}`,
      task
    );
  }
}