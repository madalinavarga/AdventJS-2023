import { Routes } from '@angular/router';
import { EventComponent } from './eveniment/event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteComponent } from './eveniment/invite/invite.component';

export const routes: Routes = [{
    path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
},
{
    path: 'event', component: EventComponent
},
{
    path: 'event/invite', component: InviteComponent
},
{
    path: 'dashboard', redirectTo: 'event/invite'
},
{
    path: '**', redirectTo: 'auth/login'
},


];
