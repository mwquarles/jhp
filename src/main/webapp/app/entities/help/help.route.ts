import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { HelpComponent } from './help.component';
import { HelpDetailComponent } from './help-detail.component';
import { HelpPopupComponent } from './help-dialog.component';
import { HelpDeletePopupComponent } from './help-delete-dialog.component';

export const helpRoute: Routes = [
    {
        path: 'help',
        component: HelpComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Helps'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'help/:id',
        component: HelpDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Helps'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const helpPopupRoute: Routes = [
    {
        path: 'help-new',
        component: HelpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Helps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'help/:id/edit',
        component: HelpPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Helps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'help/:id/delete',
        component: HelpDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Helps'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
