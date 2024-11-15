import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthDto } from '../dto/auth.dto';
import { AuthResponseDto } from '../dto/auth.response.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUrl = environment.appUrl;
  pathService: string =  '/auth/login';
  token: string | null = null;
  constructor(private httpClient: HttpClient) { 

  }

  login(credentials: AuthDto): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(`${this.appUrl}${this.pathService}`, credentials).pipe(
      tap((response: AuthResponseDto) => {
        this.token = response.token;
        localStorage.setItem('token', this.token); 
      })
    )
  }

  getToken(): string | null {
    if(!this.token){
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
}
