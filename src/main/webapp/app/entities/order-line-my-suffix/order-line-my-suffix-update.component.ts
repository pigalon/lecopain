import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IOrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';
import { OrderLineMySuffixService } from './order-line-my-suffix.service';
import { IOrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';
import { OrderCustMySuffixService } from 'app/entities/order-cust-my-suffix';
import { IProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { ProductMySuffixService } from 'app/entities/product-my-suffix';

@Component({
    selector: 'jhi-order-line-my-suffix-update',
    templateUrl: './order-line-my-suffix-update.component.html'
})
export class OrderLineMySuffixUpdateComponent implements OnInit {
    private _orderLine: IOrderLineMySuffix;
    isSaving: boolean;

    ordercusts: IOrderCustMySuffix[];

    products: IProductMySuffix[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private orderLineService: OrderLineMySuffixService,
        private orderCustService: OrderCustMySuffixService,
        private productService: ProductMySuffixService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ orderLine }) => {
            this.orderLine = orderLine;
        });
        this.orderCustService.query().subscribe(
            (res: HttpResponse<IOrderCustMySuffix[]>) => {
                this.ordercusts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productService.query({ filter: 'orderline-is-null' }).subscribe(
            (res: HttpResponse<IProductMySuffix[]>) => {
                if (!this.orderLine.productId) {
                    this.products = res.body;
                } else {
                    this.productService.find(this.orderLine.productId).subscribe(
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
        if (this.orderLine.id !== undefined) {
            this.subscribeToSaveResponse(this.orderLineService.update(this.orderLine));
        } else {
            this.subscribeToSaveResponse(this.orderLineService.create(this.orderLine));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IOrderLineMySuffix>>) {
        result.subscribe((res: HttpResponse<IOrderLineMySuffix>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackOrderCustById(index: number, item: IOrderCustMySuffix) {
        return item.id;
    }

    trackProductById(index: number, item: IProductMySuffix) {
        return item.id;
    }
    get orderLine() {
        return this._orderLine;
    }

    set orderLine(orderLine: IOrderLineMySuffix) {
        this._orderLine = orderLine;
    }
}
