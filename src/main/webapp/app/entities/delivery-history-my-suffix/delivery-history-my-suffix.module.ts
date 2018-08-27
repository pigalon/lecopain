import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    DeliveryHistoryMySuffixComponent,
    DeliveryHistoryMySuffixDetailComponent,
    DeliveryHistoryMySuffixUpdateComponent,
    DeliveryHistoryMySuffixDeletePopupComponent,
    DeliveryHistoryMySuffixDeleteDialogComponent,
    deliveryHistoryRoute,
    deliveryHistoryPopupRoute
} from './';

const ENTITY_STATES = [...deliveryHistoryRoute, ...deliveryHistoryPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryHistoryMySuffixComponent,
        DeliveryHistoryMySuffixDetailComponent,
        DeliveryHistoryMySuffixUpdateComponent,
        DeliveryHistoryMySuffixDeleteDialogComponent,
        DeliveryHistoryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DeliveryHistoryMySuffixComponent,
        DeliveryHistoryMySuffixUpdateComponent,
        DeliveryHistoryMySuffixDeleteDialogComponent,
        DeliveryHistoryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainDeliveryHistoryMySuffixModule {}
