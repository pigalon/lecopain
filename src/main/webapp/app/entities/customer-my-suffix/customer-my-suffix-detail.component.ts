import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';

@Component({
    selector: 'jhi-customer-my-suffix-detail',
    templateUrl: './customer-my-suffix-detail.component.html'
})
export class CustomerMySuffixDetailComponent implements OnInit {
    customer: ICustomerMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ customer }) => {
            this.customer = customer;
        });
    }

    previousState() {
        window.history.back();
    }
}
