import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer } from '../models/developer.model';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({ providedIn: 'root' })
export class DeveloperService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Developer[]> {
    return this.http.get<Developer[]>(
      `${this.apiUrl}${API_ENDPOINTS.DEVELOPERS.GET_ALL}`
    );
  }
}