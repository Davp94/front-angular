import { inject, Injectable } from '@angular/core';
import { PedidosStore } from '../../state-management/state.store';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { PedidoRequestDto } from '../dto/pedido.request.dto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  appUrl = environment.appUrl;
  pathService: string =  '/pedido';
  store = inject(PedidosStore);
  constructor(private httpClient: HttpClient) { }

  createPedido(pedidoRequest: PedidoRequestDto): Observable<any>{
    return this.httpClient.post<any>(`${this.appUrl}${this.pathService}`, pedidoRequest);
  }

  async calculateDetallePedido(nuevoPedido: any){
    const pedidos = this.store.pedidos();
    let total = 0;
    const pedidoToUpdate = await pedidos.find((res: any) => res.nombre == nuevoPedido.nombre);
    if(pedidoToUpdate){
      for(const pedido of pedidos){
        if(pedido.nombre == nuevoPedido.nombre){
          pedido.cantidad++;
        }
        total = total + pedido.cantidad * pedido.precio;
      }
    }else {
      pedidos.push(nuevoPedido);
      total = this.store.totalPedido() + nuevoPedido.precio;
    }
    this.store.addPedido(pedidos);
    this.store.addTotal(total);
  }
}
