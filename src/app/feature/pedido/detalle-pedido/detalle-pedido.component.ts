import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PedidosStore } from '../../../state-management/state.store';
@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.scss'
})
export class DetallePedidoComponent {

  store = inject(PedidosStore);
  constructor(){
  }
}
