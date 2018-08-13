import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';

@Component({
    selector: 'jhi-sub-line-my-suffix-detail',
    templateUrl: './sub-line-my-suffix-detail.component.html'
})
export class SubLineMySuffixDetailComponent implements OnInit {
    subLine: ISubLineMySuffix;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subLine }) => {
            this.subLine = subLine;
        });
    }

    previousState() {
        window.history.back();
    }
}
