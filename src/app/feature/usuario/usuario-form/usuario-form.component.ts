import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/service/usuario.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputTextModule, PasswordModule, ButtonModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit{

  usuariosForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private usuariosService: UsuarioService){
    this.usuariosForm = this.formBuilder.group({
      nombres: ['' as string, Validators.required],
      apellidos: ['', [Validators.required]],
      password: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email], []],
      username: ['', Validators.required],
      razonSocial: ['', Validators.required],
      nit: ['', Validators.required],
      direcciones: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.usuariosForm.get('nombres')?.valueChanges.subscribe(val => console.log(val))
  }

  onSubmit() {
    this.usuariosForm.markAllAsTouched();
    if(this.usuariosForm.valid){
      console.log("🚀 ~ UsuarioFormComponent ~ onSubmit ~ this.usuariosForm.value:", this.usuariosForm.value)
      this.usuariosService.createUser(this.usuariosForm.value).subscribe({
        next: res => console.log(res)
      })
    }
  }
}
