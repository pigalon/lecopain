import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ISubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';
import { SubHistoryMySuffixService } from './sub-history-my-suffix.service';
import { ISubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';
import { SubscMySuffixService } from 'app/entities/subsc-my-suffix';

@Component({
    selector: 'jhi-sub-history-my-suffix-update',
    templateUrl: './sub-history-my-suffix-update.component.html'
})
export class SubHistoryMySuffixUpdateComponent implements OnInit {
    private _subHistory: ISubHistoryMySuffix;
    isSaving: boolean;

    subscriptions: ISubscMySuffix[];
    actionDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private subHistoryService: SubHistoryMySuffixService,
        private subscService: SubscMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subHistory }) => {
            this.subHistory = subHistory;
        });
        this.subscService.query({ filter: 'subhistory-is-null' }).subscribe(
            (res: HttpResponse<ISubscMySuffix[]>) => {
                if (!this.subHistory.subscriptionId) {
                    this.subscriptions = res.body;
                } else {
                    this.subscService.find(this.subHistory.subscriptionId).subscribe(
                        (subRes: HttpResponse<ISubscMySuffix>) => {
                            this.subscriptions = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.subHistory.actionDate = moment(this.actionDate, DATE_TIME_FORMAT);
        if (this.subHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.subHistoryService.update(this.subHistory));
        } else {
            this.subscribeToSaveResponse(this.subHistoryService.create(this.subHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubHistoryMySuffix>>) {
        result.subscribe((res: HttpResponse<ISubHistoryMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSubscById(index: number, item: ISubscMySuffix) {
        return item.id;
    }
    get subHistory() {
        return this._subHistory;
    }

    set subHistory(subHistory: ISubHistoryMySuffix) {
        this._subHistory = subHistory;
        this.actionDate = moment(subHistory.actionDate).format(DATE_TIME_FORMAT);
    }
}
