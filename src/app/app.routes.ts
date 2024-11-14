import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { UsuarioComponent } from './feature/usuario/usuario.component';
import { UsuarioTableComponent } from './feature/usuario/usuario-table/usuario-table.component';
import { UsuarioFormComponent } from './feature/usuario/usuario-form/usuario-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'usuario', component: UsuarioComponent, children: [{ path: 'view', component: UsuarioTableComponent }, { path: 'form', component: UsuarioFormComponent }] }
];
