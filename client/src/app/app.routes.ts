import { Routes } from '@angular/router';
import { EventComponent } from './eveniment/event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [{
    path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
},
{
    path: 'event', component: EventComponent
},
{
    path: 'dashboard', component: DashboardComponent
},
{
    path: '**', redirectTo: 'auth/login'
},


];
