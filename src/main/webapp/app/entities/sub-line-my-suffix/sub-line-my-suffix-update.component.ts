import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';
import { SubLineMySuffixService } from './sub-line-my-suffix.service';
import { ISubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';
import { SubscMySuffixService } from 'app/entities/subsc-my-suffix';
import { IOrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';
import { OrderCustMySuffixService } from 'app/entities/order-cust-my-suffix';

@Component({
    selector: 'jhi-sub-line-my-suffix-update',
    templateUrl: './sub-line-my-suffix-update.component.html'
})
export class SubLineMySuffixUpdateComponent implements OnInit {
    private _subLine: ISubLineMySuffix;
    isSaving: boolean;

    subscs: ISubscMySuffix[];

    orders: IOrderCustMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private subLineService: SubLineMySuffixService,
        private subscService: SubscMySuffixService,
        private orderCustService: OrderCustMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subLine }) => {
            this.subLine = subLine;
        });
        this.subscService.query().subscribe(
            (res: HttpResponse<ISubscMySuffix[]>) => {
                this.subscs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.orderCustService.query({ filter: 'subline-is-null' }).subscribe(
            (res: HttpResponse<IOrderCustMySuffix[]>) => {
                if (!this.subLine.orderId) {
                    this.orders = res.body;
                } else {
                    this.orderCustService.find(this.subLine.orderId).subscribe(
                        (subRes: HttpResponse<IOrderCustMySuffix>) => {
                            this.orders = [subRes.body].concat(res.body);
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
        if (this.subLine.id !== undefined) {
            this.subscribeToSaveResponse(this.subLineService.update(this.subLine));
        } else {
            this.subscribeToSaveResponse(this.subLineService.create(this.subLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISubLineMySuffix>>) {
        result.subscribe((res: HttpResponse<ISubLineMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrderCustById(index: number, item: IOrderCustMySuffix) {
        return item.id;
    }
    get subLine() {
        return this._subLine;
    }

    set subLine(subLine: ISubLineMySuffix) {
        this._subLine = subLine;
    }
}
