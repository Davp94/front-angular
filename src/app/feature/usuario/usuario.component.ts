import { Component } from '@angular/core';
import { UsuarioTableComponent } from "./usuario-table/usuario-table.component";
import { UsuarioFormComponent } from "./usuario-form/usuario-form.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [UsuarioTableComponent, UsuarioFormComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {

}
