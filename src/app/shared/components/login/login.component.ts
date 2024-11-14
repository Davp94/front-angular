import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../core/service/auth.service';
import { AuthDto } from '../../../core/dto/auth.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ButtonModule, CheckboxModule, InputTextModule, FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
  }

  login() {
    const credentials: AuthDto = {correo: this.username, password: this.password}
    this.authService.login(credentials).subscribe({
      next: res => console.log(res),
      error: err => console.log()
    })
  }
}
