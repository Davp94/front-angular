import { Component } from '@angular/core';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss'
})
export class ProductoFormComponent {
//   saveProduct() {
//     this.submitted = true;

//     if (this.product.name?.trim()) {
//         if (this.product.id) {
//             this.products[this.findIndexById(this.product.id)] = this.product;
//             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
//         } else {
//             this.product.id = this.createId();
//             this.product.image = 'product-placeholder.svg';
//             this.products.push(this.product);
//             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
//         }

//         this.products = [...this.products];
//         this.productDialog = false;
//         this.product = {};
//     }
// }
}
