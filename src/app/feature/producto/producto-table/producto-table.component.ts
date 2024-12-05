import { Component, OnInit, signal } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
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
import { ProductoFormComponent } from "../producto-form/producto-form.component";

@Component({
  selector: 'app-producto-table',
  standalone: true,
  imports: [TableModule, DialogModule, RippleModule, ButtonModule, ToastModule, ToolbarModule, ConfirmDialogModule, InputTextModule, InputTextareaModule, CommonModule, FileUploadModule, DropdownModule, TagModule, RadioButtonModule, RatingModule, InputTextModule, FormsModule, InputNumberModule, ProductoFormComponent],
  providers: [MessageService, ConfirmationService, ProductoService],
  templateUrl: './producto-table.component.html',
  styleUrl: './producto-table.component.scss'
})
export class ProductoTableComponent implements OnInit{
  productDialog = signal(false);

  products!: ProductoDto[];

  product!: ProductoDto;

  submitted: boolean = false;

  statuses!: any[];

  imgBaseUrl = environment.appUrl + environment.imgPath;

  totalRecords: number = 0;

  constructor(private productoService: ProductoService, private messageService: MessageService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
      this.submitted = false;
      this.productDialog.set(true);
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
    this.productDialog.set(false);
      this.submitted = false;
  }

  lazyLoadEvent(event: TableLazyLoadEvent){
    this.productoService.findAllProductsPagination({take: event.rows || 10, page: event.first || 0, sortDireccion: event.sortOrder == 1 ? OrderEnum.ASC : OrderEnum.DESC, sortParam: event.sortField as string || 'id' }).subscribe({
        next: (data: ProductoPaginationDto) => {
            this.products = data.content;
            this.totalRecords = data.totalRecords
        },
        error: err => console.log(err)
      });
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
