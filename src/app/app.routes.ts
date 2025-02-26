import { Routes } from '@angular/router';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { ListaCitasComponent } from './components/lista-citas/lista-citas.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'components/registro-cita',
        pathMatch: 'full'
    },
    {
        path:'components/registro-cita',
        component: RegistroCitaComponent
    },
    {
        path: 'components/lista-citas',
        component: ListaCitasComponent
    }
];
