import { Component, inject, OnInit } from '@angular/core';
import { ProductoDto } from '../../../core/dto/producto.dto';
import { ProductoService } from '../../../core/service/producto.service';
import { CommonModule } from '@angular/common';
import { OrderEnum } from '../../../shared/enum/order.enum';
import { ProductoPaginationDto } from '../../../core/dto/producto-pagination.dto';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { environment } from '../../../../environments/environment.development';
import { PedidosStore } from '../../../state-management/state.store';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule],
  providers: [ProductoService],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.scss'
})
export class ProductoListComponent implements OnInit{


  products!: ProductoDto[];
  imgBaseUrl = environment.appUrl + environment.imgPath;
  store = inject(PedidosStore);
  constructor(private productoService: ProductoService){

  }
  ngOnInit(): void {
     this.productoService.findAllProductsPagination({take: 2, page: 0, sortDireccion: OrderEnum.ASC, sortParam: 'id' }).subscribe({
        next: (data: ProductoPaginationDto) => this.products = data.content,
        error: err => console.log(err)
      });
  }

  realizarPedido(item: any) {
    console.log("🚀 ~ ProductoListComponent ~ item:", item)
    this.store.addPedido({nombre: item.nombre, nombreCategoria: item.nombreCategoria, precio: item.precio});
  }

}
