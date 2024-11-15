import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { UsuarioComponent } from './feature/usuario/usuario.component';
import { ConceptsComponent } from './feature/concepts/concepts.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: UsuarioComponent},
    { 
        path: '', component: ConceptsComponent,
        title: 'Index' ,
        canActivate: [authGuard],
    }
];
