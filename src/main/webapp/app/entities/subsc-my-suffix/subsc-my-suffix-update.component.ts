import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';
import { SubscMySuffixService } from './subsc-my-suffix.service';

@Component({
    selector: 'jhi-subsc-my-suffix-update',
    templateUrl: './subsc-my-suffix-update.component.html'
})
export class SubscMySuffixUpdateComponent implements OnInit {
    private _subsc: ISubscMySuffix;
    isSaving: boolean;
    startDate: string;
    endDate: string;

    constructor(private subscService: SubscMySuffixService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subsc }) => {
            this.subsc = subsc;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.subsc.startDate = moment(this.startDate, DATE_TIME_FORMAT);
        this.subsc.endDate = moment(this.endDate, DATE_TIME_FORMAT);
        if (this.subsc.id !== undefined) {
            this.subscribeToSaveResponse(this.subscService.update(this.subsc));
        } else {
            this.subscribeToSaveResponse(this.subscService.create(this.subsc));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubscMySuffix>>) {
        result.subscribe((res: HttpResponse<ISubscMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get subsc() {
        return this._subsc;
    }

    set subsc(subsc: ISubscMySuffix) {
        this._subsc = subsc;
        this.startDate = moment(subsc.startDate).format(DATE_TIME_FORMAT);
        this.endDate = moment(subsc.endDate).format(DATE_TIME_FORMAT);
    }
}
