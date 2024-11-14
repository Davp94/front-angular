import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from '../usuario/usuario.component';
import { ButtonModule } from 'primeng/button';
export interface UsuarioDto {
  id: number;
  nombre: string;
  apellidos: string;
}

@Component({
  selector: 'app-concepts',
  standalone: true,
  imports: [FormsModule, CommonModule, UsuarioComponent, ButtonModule],
  templateUrl: './concepts.component.html',
  styleUrl: './concepts.component.scss'
})
export class ConceptsComponent {
  titles: string[] = ['title1', 'title 2', 'title 3']
  title: string = 'front-angulardsadasd';
  displayArrayTitles: boolean = true;
  usuario: UsuarioDto = {
    id: 1,
    nombre: 'usuario1',
    apellidos: 'suario 1 ap'
  }

  clickButton() {
    console.log('CLICKING BUTTON')
  }

  imageUrl = 'http://localhost:4200/public/favicon.ico'

}
