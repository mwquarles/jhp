import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhpFooModule } from './foo/foo.module';
import { JhpBarModule } from './bar/bar.module';
import { JhpHelpModule } from './help/help.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhpFooModule,
        JhpBarModule,
        JhpHelpModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhpEntityModule {}
