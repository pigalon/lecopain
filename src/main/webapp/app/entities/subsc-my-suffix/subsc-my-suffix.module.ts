import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    SubscMySuffixComponent,
    SubscMySuffixDetailComponent,
    SubscMySuffixUpdateComponent,
    SubscMySuffixDeletePopupComponent,
    SubscMySuffixDeleteDialogComponent,
    subscRoute,
    subscPopupRoute
} from './';

const ENTITY_STATES = [...subscRoute, ...subscPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubscMySuffixComponent,
        SubscMySuffixDetailComponent,
        SubscMySuffixUpdateComponent,
        SubscMySuffixDeleteDialogComponent,
        SubscMySuffixDeletePopupComponent
    ],
    entryComponents: [
        SubscMySuffixComponent,
        SubscMySuffixUpdateComponent,
        SubscMySuffixDeleteDialogComponent,
        SubscMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainSubscMySuffixModule {}
