import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    OrderCustMySuffixComponent,
    OrderCustMySuffixDetailComponent,
    OrderCustMySuffixUpdateComponent,
    OrderCustMySuffixDeletePopupComponent,
    OrderCustMySuffixDeleteDialogComponent,
    orderCustRoute,
    orderCustPopupRoute
} from './';

const ENTITY_STATES = [...orderCustRoute, ...orderCustPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderCustMySuffixComponent,
        OrderCustMySuffixDetailComponent,
        OrderCustMySuffixUpdateComponent,
        OrderCustMySuffixDeleteDialogComponent,
        OrderCustMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OrderCustMySuffixComponent,
        OrderCustMySuffixUpdateComponent,
        OrderCustMySuffixDeleteDialogComponent,
        OrderCustMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainOrderCustMySuffixModule {}
