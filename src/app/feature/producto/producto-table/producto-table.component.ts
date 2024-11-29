import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductoPaginationDto } from '../../../core/dto/producto-pagination.dto';
import { ProductoDto } from '../../../core/dto/producto.dto';
import { ProductoService } from '../../../core/service/producto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment.development';
import { OrderEnum } from '../../../shared/enum/order.enum';

@Component({
  selector: 'app-producto-table',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule],
  providers: [MessageService, ConfirmationService, ProductoService],
  templateUrl: './producto-table.component.html',
  styleUrl: './producto-table.component.scss'
})
export class ProductoTableComponent implements OnInit{
  productDialog: boolean = false;

  products!: ProductoDto[];

  product!: ProductoDto;

  submitted: boolean = false;

  statuses!: any[];

  imgBaseUrl = environment.appUrl + environment.imgPath;

  constructor(private productoService: ProductoService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.productoService.findAllProductsPagination({take: 2, page: 0, sortDireccion: OrderEnum.ASC, sortParam: 'id' }).subscribe({
        next: (data: ProductoPaginationDto) => this.products = data.content,
        error: err => console.log(err)
      });

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  //TODO add field stock on producto
//   getSeverity(status: string) {
//       switch (status) {
//           case 'INSTOCK':
//               return 'success';
//           case 'LOWSTOCK':
//               return 'warning';
//           case 'OUTOFSTOCK':
//               return 'danger';
//       }
//   }
}
