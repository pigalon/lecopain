import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    ProductHistoryMySuffixComponent,
    ProductHistoryMySuffixDetailComponent,
    ProductHistoryMySuffixUpdateComponent,
    ProductHistoryMySuffixDeletePopupComponent,
    ProductHistoryMySuffixDeleteDialogComponent,
    productHistoryRoute,
    productHistoryPopupRoute
} from './';

const ENTITY_STATES = [...productHistoryRoute, ...productHistoryPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProductHistoryMySuffixComponent,
        ProductHistoryMySuffixDetailComponent,
        ProductHistoryMySuffixUpdateComponent,
        ProductHistoryMySuffixDeleteDialogComponent,
        ProductHistoryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        ProductHistoryMySuffixComponent,
        ProductHistoryMySuffixUpdateComponent,
        ProductHistoryMySuffixDeleteDialogComponent,
        ProductHistoryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainProductHistoryMySuffixModule {}
