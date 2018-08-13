import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';

@Component({
    selector: 'jhi-subsc-my-suffix-detail',
    templateUrl: './subsc-my-suffix-detail.component.html'
})
export class SubscMySuffixDetailComponent implements OnInit {
    subsc: ISubscMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subsc }) => {
            this.subsc = subsc;
        });
    }

    previousState() {
        window.history.back();
    }
}
