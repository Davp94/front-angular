import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto } from '../dto/usuario.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  appUrl = environment.appUrl;
  pathService: string =  '/categoria';
  constructor(private httpClient: HttpClient) { }

  findAllCategorias(): Observable<any> {
    return this.httpClient.get<any>(`${this.appUrl}${this.pathService}`);
  }
}
