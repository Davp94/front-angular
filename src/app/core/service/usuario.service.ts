import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto } from '../dto/usuario.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  appUrl = environment.appUrl;
  pathService: string =  '/usuario';
  constructor(private httpClient: HttpClient) { }

  createUser(usuarioDto: UsuarioDto): Observable<UsuarioDto> {
    return this.httpClient.post<UsuarioDto>(`${this.appUrl}${this.pathService}`, usuarioDto);
  }
}
