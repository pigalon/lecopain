import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';

@Component({
    selector: 'jhi-sub-history-my-suffix-detail',
    templateUrl: './sub-history-my-suffix-detail.component.html'
})
export class SubHistoryMySuffixDetailComponent implements OnInit {
    subHistory: ISubHistoryMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subHistory }) => {
            this.subHistory = subHistory;
        });
    }

    previousState() {
        window.history.back();
    }
}
