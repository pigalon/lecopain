import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IProductHistoryMySuffix } from 'app/shared/model/product-history-my-suffix.model';
import { ProductHistoryMySuffixService } from './product-history-my-suffix.service';
import { IProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { ProductMySuffixService } from 'app/entities/product-my-suffix';

@Component({
    selector: 'jhi-product-history-my-suffix-update',
    templateUrl: './product-history-my-suffix-update.component.html'
})
export class ProductHistoryMySuffixUpdateComponent implements OnInit {
    private _productHistory: IProductHistoryMySuffix;
    isSaving: boolean;

    products: IProductMySuffix[];
    actionDate: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private productHistoryService: ProductHistoryMySuffixService,
        private productService: ProductMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ productHistory }) => {
            this.productHistory = productHistory;
        });
        this.productService.query({ filter: 'producthistory-is-null' }).subscribe(
            (res: HttpResponse<IProductMySuffix[]>) => {
                if (!this.productHistory.productId) {
                    this.products = res.body;
                } else {
                    this.productService.find(this.productHistory.productId).subscribe(
                        (subRes: HttpResponse<IProductMySuffix>) => {
                            this.products = [subRes.body].concat(res.body);
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
        this.productHistory.actionDate = moment(this.actionDate, DATE_TIME_FORMAT);
        if (this.productHistory.id !== undefined) {
            this.subscribeToSaveResponse(this.productHistoryService.update(this.productHistory));
        } else {
            this.subscribeToSaveResponse(this.productHistoryService.create(this.productHistory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProductHistoryMySuffix>>) {
        result.subscribe(
            (res: HttpResponse<IProductHistoryMySuffix>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackProductById(index: number, item: IProductMySuffix) {
        return item.id;
    }
    get productHistory() {
        return this._productHistory;
    }

    set productHistory(productHistory: IProductHistoryMySuffix) {
        this._productHistory = productHistory;
        this.actionDate = moment(productHistory.actionDate).format(DATE_TIME_FORMAT);
    }
}
