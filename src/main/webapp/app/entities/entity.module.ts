import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LecopainProductMySuffixModule } from './product-my-suffix/product-my-suffix.module';
import { LecopainCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { LecopainOrderTimelineModule } from './order-timeline/order-timeline.module';
import { LecopainOrderMainMySuffixModule } from './order-main-my-suffix/order-main-my-suffix.module';
import { LecopainOrderLineMySuffixModule } from './order-line-my-suffix/order-line-my-suffix.module';
import { LecopainDeliveryMySuffixModule } from './delivery-my-suffix/delivery-my-suffix.module';
import { LecopainSubscMySuffixModule } from './subsc-my-suffix/subsc-my-suffix.module';
import { LecopainSubLineMySuffixModule } from './sub-line-my-suffix/sub-line-my-suffix.module';
import { LecopainOrderHistoryMySuffixModule } from './order-history-my-suffix/order-history-my-suffix.module';
import { LecopainProductHistoryMySuffixModule } from './product-history-my-suffix/product-history-my-suffix.module';
import { LecopainSubHistoryMySuffixModule } from './sub-history-my-suffix/sub-history-my-suffix.module';
import { LecopainDeliveryHistoryMySuffixModule } from './delivery-history-my-suffix/delivery-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LecopainProductMySuffixModule,
        LecopainCustomerMySuffixModule,
        LecopainOrderTimelineModule,
        LecopainOrderMainMySuffixModule,
        LecopainOrderLineMySuffixModule,
        LecopainDeliveryMySuffixModule,
        LecopainSubscMySuffixModule,
        LecopainSubLineMySuffixModule,
        LecopainOrderHistoryMySuffixModule,
        LecopainProductHistoryMySuffixModule,
        LecopainSubHistoryMySuffixModule,
        LecopainDeliveryHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainEntityModule {}
