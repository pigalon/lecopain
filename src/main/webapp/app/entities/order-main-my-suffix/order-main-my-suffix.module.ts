import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    OrderMainMySuffixComponent,
    OrderMainMySuffixDetailComponent,
    OrderMainMySuffixUpdateComponent,
    OrderMainMySuffixDeletePopupComponent,
    OrderMainMySuffixDeleteDialogComponent,
    orderMainRoute,
    orderMainPopupRoute
} from './';

const ENTITY_STATES = [...orderMainRoute, ...orderMainPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderMainMySuffixComponent,
        OrderMainMySuffixDetailComponent,
        OrderMainMySuffixUpdateComponent,
        OrderMainMySuffixDeleteDialogComponent,
        OrderMainMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OrderMainMySuffixComponent,
        OrderMainMySuffixUpdateComponent,
        OrderMainMySuffixDeleteDialogComponent,
        OrderMainMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainOrderMainMySuffixModule {}
