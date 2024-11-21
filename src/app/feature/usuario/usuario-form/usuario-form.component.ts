import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/service/usuario.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit{

  usuariosForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private usuariosService: UsuarioService, private messageService: MessageService, private router: Router){
    this.usuariosForm = this.formBuilder.group({
      nombres: ['' as string, Validators.required],
      apellidos: ['', [Validators.required]],
      password: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email], []],
      username: ['', Validators.required],
      razonSocial: ['', Validators.required],
      nit: ['', Validators.required],
      direcciones: this.formBuilder.array([this.formBuilder.group({
        zona: ['', Validators.required],
        calle: ['', Validators.required],
        nro: ['', Validators.required]
      })])
    })
  }

  get direcciones() {
    return this.usuariosForm.get('direcciones') as FormArray;
  }

  isValidFormField(field: string): boolean | null {
    return this.usuariosForm.controls[field].errors && 
    this.usuariosForm.controls[field].touched
  }

  isValidFormFieldArray(formArray: FormArray, index: number, field: string){
    const formGroup = formArray.controls[index] as FormGroup;
    return formGroup.controls[field].errors && 
    formGroup.controls[field].touched
  }

  getFormFieldErrors(field: string){
    const errors = this.usuariosForm.controls[field].errors;
    if(errors){
      for(const key of Object.keys(errors)){
        switch(key){
          case 'required':
            return 'Campo requerido';
          case 'email':
            return 'El correo debe tener un formato válido'
        }
      }
    }
    return null;
  }

  createDireccion() {
    this.direcciones.push(
      this.formBuilder.group({
        zona: ['', Validators.required],
        calle: ['', Validators.required],
        nro: ['', Validators.required]
      })
    )
  }

  removeDireccion(index: number){
    this.direcciones.removeAt(index);
  }

  ngOnInit(): void {
    this.usuariosForm.get('nombres')?.valueChanges.subscribe(val => console.log(val))
  }

  onSubmit() {
    this.usuariosForm.markAllAsTouched();
    if(this.usuariosForm.valid){
      
      this.usuariosService.createUser(this.usuariosForm.value).subscribe({
        next: res => {
          this.messageService.add({ severity: 'Success', summary: 'Success', detail: 'Se registro el usuario con éxito, Puede ingresar con sus credenciales' })
          this.router.navigateByUrl('/login');
        },
        error: res => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al registrar el usuario' })
        }
      })
    }else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al enviar los datos, debe completar el formulario' })
    }
  }
}
