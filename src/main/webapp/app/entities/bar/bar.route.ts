import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BarComponent } from './bar.component';
import { BarDetailComponent } from './bar-detail.component';
import { BarPopupComponent } from './bar-dialog.component';
import { BarDeletePopupComponent } from './bar-delete-dialog.component';

export const barRoute: Routes = [
    {
        path: 'bar',
        component: BarComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bars'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bar/:id',
        component: BarDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bars'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const barPopupRoute: Routes = [
    {
        path: 'bar-new',
        component: BarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar/:id/edit',
        component: BarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bar/:id/delete',
        component: BarDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bars'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
