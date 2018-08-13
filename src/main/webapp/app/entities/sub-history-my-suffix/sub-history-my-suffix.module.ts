import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    SubHistoryMySuffixComponent,
    SubHistoryMySuffixDetailComponent,
    SubHistoryMySuffixUpdateComponent,
    SubHistoryMySuffixDeletePopupComponent,
    SubHistoryMySuffixDeleteDialogComponent,
    subHistoryRoute,
    subHistoryPopupRoute
} from './';

const ENTITY_STATES = [...subHistoryRoute, ...subHistoryPopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubHistoryMySuffixComponent,
        SubHistoryMySuffixDetailComponent,
        SubHistoryMySuffixUpdateComponent,
        SubHistoryMySuffixDeleteDialogComponent,
        SubHistoryMySuffixDeletePopupComponent
    ],
    entryComponents: [
        SubHistoryMySuffixComponent,
        SubHistoryMySuffixUpdateComponent,
        SubHistoryMySuffixDeleteDialogComponent,
        SubHistoryMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainSubHistoryMySuffixModule {}
