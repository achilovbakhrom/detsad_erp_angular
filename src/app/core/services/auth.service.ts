import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { REFRESH_TOKEN } from '../../constants';
import { LoginResponse } from '../../model/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('user/login/', { username, password });
  }

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    return this.http
      .post<{ accessToken: string }>('/refresh', { refreshToken })
      .pipe(map((response) => response.accessToken));
  }
}
