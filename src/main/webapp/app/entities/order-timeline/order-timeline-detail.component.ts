import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';

@Component({
    selector: 'jhi-order-timeline-detail',
    templateUrl: './order-timeline-detail.component.html'
})
export class OrderTimelineDetailComponent implements OnInit {
    orderMain: IOrderMainMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderMain }) => {
            this.orderMain = orderMain;
        });
    }

    previousState() {
        window.history.back();
    }
}
