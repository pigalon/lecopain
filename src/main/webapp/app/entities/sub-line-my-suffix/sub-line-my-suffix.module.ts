import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    SubLineMySuffixComponent,
    SubLineMySuffixDetailComponent,
    SubLineMySuffixUpdateComponent,
    SubLineMySuffixDeletePopupComponent,
    SubLineMySuffixDeleteDialogComponent,
    subLineRoute,
    subLinePopupRoute
} from './';

const ENTITY_STATES = [...subLineRoute, ...subLinePopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubLineMySuffixComponent,
        SubLineMySuffixDetailComponent,
        SubLineMySuffixUpdateComponent,
        SubLineMySuffixDeleteDialogComponent,
        SubLineMySuffixDeletePopupComponent
    ],
    entryComponents: [
        SubLineMySuffixComponent,
        SubLineMySuffixUpdateComponent,
        SubLineMySuffixDeleteDialogComponent,
        SubLineMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainSubLineMySuffixModule {}
