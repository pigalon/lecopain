import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    DeliveryMySuffixComponent,
    DeliveryMySuffixDetailComponent,
    DeliveryMySuffixUpdateComponent,
    DeliveryMySuffixDeletePopupComponent,
    DeliveryMySuffixDeleteDialogComponent,
    deliveryRoute,
    deliveryPopupRoute
} from './';

const ENTITY_STATES = [...deliveryRoute, ...deliveryPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DeliveryMySuffixComponent,
        DeliveryMySuffixDetailComponent,
        DeliveryMySuffixUpdateComponent,
        DeliveryMySuffixDeleteDialogComponent,
        DeliveryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DeliveryMySuffixComponent,
        DeliveryMySuffixUpdateComponent,
        DeliveryMySuffixDeleteDialogComponent,
        DeliveryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainDeliveryMySuffixModule {}
