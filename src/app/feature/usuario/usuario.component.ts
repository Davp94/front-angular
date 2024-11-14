import { Component } from '@angular/core';
import { UsuarioTableComponent } from "./usuario-table/usuario-table.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [UsuarioTableComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

}
