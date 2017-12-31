import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhpSharedModule } from '../../shared';
import {
    BarService,
    BarPopupService,
    BarComponent,
    BarDetailComponent,
    BarDialogComponent,
    BarPopupComponent,
    BarDeletePopupComponent,
    BarDeleteDialogComponent,
    barRoute,
    barPopupRoute,
} from './';

const ENTITY_STATES = [
    ...barRoute,
    ...barPopupRoute,
];

@NgModule({
    imports: [
        JhpSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BarComponent,
        BarDetailComponent,
        BarDialogComponent,
        BarDeleteDialogComponent,
        BarPopupComponent,
        BarDeletePopupComponent,
    ],
    entryComponents: [
        BarComponent,
        BarDialogComponent,
        BarPopupComponent,
        BarDeleteDialogComponent,
        BarDeletePopupComponent,
    ],
    providers: [
        BarService,
        BarPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhpBarModule {}
