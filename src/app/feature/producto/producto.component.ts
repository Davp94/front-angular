import { Component } from '@angular/core';
import { ProductoTableComponent } from "./producto-table/producto-table.component";

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [ProductoTableComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent {

}
