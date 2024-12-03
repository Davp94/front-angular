import { Component } from '@angular/core';
import { ProductoListComponent } from "../producto/producto-list/producto-list.component";
import { CommonModule } from '@angular/common';
import { DetallePedidoComponent } from "./detalle-pedido/detalle-pedido.component";

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [ProductoListComponent, CommonModule, DetallePedidoComponent],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.scss'
})
export class PedidoComponent {

}
