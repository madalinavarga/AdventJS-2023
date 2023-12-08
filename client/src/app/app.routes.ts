import { Routes } from '@angular/router';
import { EventComponent } from './eveniment/event/event.component';

export const routes: Routes = [{
    path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
},
{
    path: 'event', component: EventComponent
}];
