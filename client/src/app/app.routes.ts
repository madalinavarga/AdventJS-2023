import { Routes } from '@angular/router';
import { EventComponent } from './eveniment/event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteComponent } from './eveniment/invite/invite.component';
import { InvitationsComponent } from './invitations-dashboard/invitations/invitations.component';
import { MyWishlistComponent } from './wishlist/components/create-wishlist/my-wishlist.component';

export const routes: Routes = [{
    path: 'auth', loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
},
{
    path: 'event/:id/invite', component: InviteComponent,
},
{
    path: 'event', component: EventComponent
},
{
    path: 'dashboard', component: DashboardComponent
},
{
    path: 'invitations', component: InvitationsComponent
},
{
    path: 'mywishlist', component: MyWishlistComponent
},
{
    path: '**', redirectTo: 'auth/login'
},
];
