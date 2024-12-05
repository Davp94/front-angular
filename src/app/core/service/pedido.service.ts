import { inject, Injectable } from '@angular/core';
import { PedidosStore } from '../../state-management/state.store';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  store = inject(PedidosStore);
  constructor() { }

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
      total = total + nuevoPedido.precio;
    }
    console.log("🚀 ~ PedidoService ~ pedidos:", pedidos)

    this.store.addPedido(pedidos);
    this.store.addTotal(total);

  }
}
