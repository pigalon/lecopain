import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductHistoryMySuffix } from 'app/shared/model/product-history-my-suffix.model';

@Component({
    selector: 'jhi-product-history-my-suffix-detail',
    templateUrl: './product-history-my-suffix-detail.component.html'
})
export class ProductHistoryMySuffixDetailComponent implements OnInit {
    productHistory: IProductHistoryMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productHistory }) => {
            this.productHistory = productHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
