import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDto } from '../dto/auth.dto';
import { AuthResponseDto } from '../dto/auth.response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(credentials: AuthDto): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>('http://localhost:3000/auth/login', credentials)
  }
}
