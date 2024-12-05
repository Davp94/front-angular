import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { CategoriaService } from '../../../core/service/categoria.service';
import { ProductoService } from '../../../core/service/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss',
})
export class ProductoFormComponent implements OnInit{
  uploadedFiles: any[] = [];
  productForm: FormGroup;
  @Input() booleanDialog!: WritableSignal<boolean>;
  categorias = [];
  constructor(private categoriaService: CategoriaService, private formBuilder: FormBuilder, private productService: ProductoService){
    this.productForm = this.formBuilder.group({
      nombre: '',
      descripcion: '',
      precio: 0,
      categoriaId: 0,
      img: ''
    })
  }
  ngOnInit(): void {
    this.categoriaService.findAllCategorias().subscribe({
      next: res => this.categorias = res,
      error: err => console.log(err)
    })
  }

  onUpload(event: any) {
    for (let file of event.files) {
      console.log("🚀 ~ ProductoFormComponent ~ onUpload ~ event.files:", event.files)
      this.uploadedFiles.push(file);
    }
  }

  createProduct(){
    if(this.productForm.valid){
      this.productService.createProducto(this.productForm.value, this.uploadedFiles[0]).subscribe({
        next: res => {
          alert('Producto Creado exitosamente');
          this.closeDialog();
        },
        error: err => console.log(err)
      })
    }
  }

  closeDialog(){
    this.booleanDialog.update(value => !value);
  }
}
