import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    OrderLineMySuffixComponent,
    OrderLineMySuffixDetailComponent,
    OrderLineMySuffixUpdateComponent,
    OrderLineMySuffixDeletePopupComponent,
    OrderLineMySuffixDeleteDialogComponent,
    orderLineRoute,
    orderLinePopupRoute
} from './';

const ENTITY_STATES = [...orderLineRoute, ...orderLinePopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderLineMySuffixComponent,
        OrderLineMySuffixDetailComponent,
        OrderLineMySuffixUpdateComponent,
        OrderLineMySuffixDeleteDialogComponent,
        OrderLineMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OrderLineMySuffixComponent,
        OrderLineMySuffixUpdateComponent,
        OrderLineMySuffixDeleteDialogComponent,
        OrderLineMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainOrderLineMySuffixModule {}
