import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LecopainLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { LecopainProductMySuffixModule } from './product-my-suffix/product-my-suffix.module';
import { LecopainCustomerMySuffixModule } from './customer-my-suffix/customer-my-suffix.module';
import { LecopainOrderCustMySuffixModule } from './order-cust-my-suffix/order-cust-my-suffix.module';
import { LecopainOrderLineMySuffixModule } from './order-line-my-suffix/order-line-my-suffix.module';
import { LecopainSubscMySuffixModule } from './subsc-my-suffix/subsc-my-suffix.module';
import { LecopainSubLineMySuffixModule } from './sub-line-my-suffix/sub-line-my-suffix.module';
import { LecopainOrderHistoryMySuffixModule } from './order-history-my-suffix/order-history-my-suffix.module';
import { LecopainProductHistoryMySuffixModule } from './product-history-my-suffix/product-history-my-suffix.module';
import { LecopainSubHistoryMySuffixModule } from './sub-history-my-suffix/sub-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        LecopainLocationMySuffixModule,
        LecopainProductMySuffixModule,
        LecopainCustomerMySuffixModule,
        LecopainOrderCustMySuffixModule,
        LecopainOrderLineMySuffixModule,
        LecopainSubscMySuffixModule,
        LecopainSubLineMySuffixModule,
        LecopainOrderHistoryMySuffixModule,
        LecopainProductHistoryMySuffixModule,
        LecopainSubHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LecopainEntityModule {}
