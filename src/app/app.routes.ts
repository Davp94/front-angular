import { Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { UsuarioComponent } from './feature/usuario/usuario.component';
import { ConceptsComponent } from './feature/concepts/concepts.component';
import { authGuard } from './core/guard/auth.guard';
import { MainComponent } from './shared/components/layout/main/main.component';
import { ProductoComponent } from './feature/producto/producto.component';
import { PedidoComponent } from './feature/pedido/pedido.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: UsuarioComponent},
    { 
        path: '', component: MainComponent,
        title: 'Index' ,
        canActivate: [authGuard],
        children: [
            {
                path: 'producto', 
                component: ProductoComponent
            }, 
            {
                path: 'pedido', 
                component: PedidoComponent
            }
        ]
    }
];
