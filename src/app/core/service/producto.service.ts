import { Injectable } from '@angular/core';
import { ProductoPaginationDto } from '../dto/producto-pagination.dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoPaginationRequestDto } from '../dto/producto-pagination.req.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  appUrl = environment.appUrl;
  pathService: string =  '/producto';
  constructor(private httpClient: HttpClient) { }

  findAllProductsPagination(productoPaginationDto: ProductoPaginationRequestDto): Observable<ProductoPaginationDto>{
    const params  = new HttpParams()
    .set('take', productoPaginationDto.take)
    .set('page', productoPaginationDto.page)
    .set('sortDireccion', productoPaginationDto.sortDireccion)
    .set('sortParam', productoPaginationDto.sortParam);
    return this.httpClient.get<ProductoPaginationDto>(`${this.appUrl}${this.pathService}`, {params: params });
  }
}
