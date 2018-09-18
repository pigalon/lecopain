import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LecopainSharedModule } from 'app/shared';
import {
    OrderTimelineComponent,
    OrderTimelineDetailComponent,
    OrderTimelineUpdateComponent,
    OrderTimelineDeletePopupComponent,
    OrderTimelineDeleteDialogComponent,
    orderTimelineRoute,
    orderTimelinePopupRoute
} from '.';

const ENTITY_STATES = [...orderTimelineRoute, ...orderTimelinePopupRoute];

@NgModule({
    imports: [LecopainSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OrderTimelineComponent,
        OrderTimelineDetailComponent,
        OrderTimelineUpdateComponent,
        OrderTimelineDeleteDialogComponent,
        OrderTimelineDeletePopupComponent
    ],
    entryComponents: [
        OrderTimelineComponent,
        OrderTimelineUpdateComponent,
        OrderTimelineDeleteDialogComponent,
        OrderTimelineDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainOrderTimelineModule {}
