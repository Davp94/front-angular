import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/service/auth.service';
import { AuthDto } from '../../../core/dto/auth.dto';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, FormsModule, ToastModule, RippleModule],
  providers: [AuthService, MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService){

  }

  ngOnInit(): void {
  }

  login() {
    const credentials: AuthDto = {correo: this.username, password: this.password}
    this.authService.login(credentials).subscribe({
      next: res => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login Successfully!' });
        this.router.navigate(['/']);
      },
      error: err => {
        console.log("🚀 ~ LoginComponent ~ this.authService.login ~ err:", err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error login' })
      } 

    })
      
  }
}
