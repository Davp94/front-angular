import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PedidosStore } from '../../../state-management/state.store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PedidoService } from '../../../core/service/pedido.service';
@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule, ConfirmDialogModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.scss'
})
export class DetallePedidoComponent {

  store = inject(PedidosStore);
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private pedidoService: PedidoService){
  }

  realizarPedido(event: Event){
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Está seguro de realizar el pedido?',
      header: 'CONFIRMACIÓN',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        const pedidos = this.store.pedidos();
        this.pedidoService.createPedido({usuarioId: Number(localStorage.getItem('uid')), detallePedido: this.buildPedido(pedidos)}).subscribe({
          next: res =>  {
            this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Pedido Realizado' }),
            this.store.resetPedido();
          },
          error: err => this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Error al crear el pedido', life: 3000 })
        })
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rechazado', detail: 'Operacion rechazada', life: 3000 });
      }
  });
  }

  buildPedido(pedidos: any){
    let pedidosList = []
    for(const pedido of pedidos){
      const pedidoFormat = {productoId: pedido.id, subTotal: pedido.cantidad * pedido.precio, cantidad: pedido.cantidad } 
      pedidosList.push(pedidoFormat)
    }
    return pedidosList;
  }
}
