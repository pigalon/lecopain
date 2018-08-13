import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    OrderHistoryMySuffixComponent,
    OrderHistoryMySuffixDetailComponent,
    OrderHistoryMySuffixUpdateComponent,
    OrderHistoryMySuffixDeletePopupComponent,
    OrderHistoryMySuffixDeleteDialogComponent,
    orderHistoryRoute,
    orderHistoryPopupRoute
} from './';

const ENTITY_STATES = [...orderHistoryRoute, ...orderHistoryPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderHistoryMySuffixComponent,
        OrderHistoryMySuffixDetailComponent,
        OrderHistoryMySuffixUpdateComponent,
        OrderHistoryMySuffixDeleteDialogComponent,
        OrderHistoryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        OrderHistoryMySuffixComponent,
        OrderHistoryMySuffixUpdateComponent,
        OrderHistoryMySuffixDeleteDialogComponent,
        OrderHistoryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainOrderHistoryMySuffixModule {}
