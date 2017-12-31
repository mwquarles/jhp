import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhpSharedModule } from '../../shared';
import {
    HelpService,
    HelpPopupService,
    HelpComponent,
    HelpDetailComponent,
    HelpDialogComponent,
    HelpPopupComponent,
    HelpDeletePopupComponent,
    HelpDeleteDialogComponent,
    helpRoute,
    helpPopupRoute,
} from './';

const ENTITY_STATES = [
    ...helpRoute,
    ...helpPopupRoute,
];

@NgModule({
    imports: [
        JhpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HelpComponent,
        HelpDetailComponent,
        HelpDialogComponent,
        HelpDeleteDialogComponent,
        HelpPopupComponent,
        HelpDeletePopupComponent,
    ],
    entryComponents: [
        HelpComponent,
        HelpDialogComponent,
        HelpPopupComponent,
        HelpDeleteDialogComponent,
        HelpDeletePopupComponent,
    ],
    providers: [
        HelpService,
        HelpPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhpHelpModule {}
