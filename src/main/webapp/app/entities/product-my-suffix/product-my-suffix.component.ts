import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProductMySuffix } from 'app/shared/model/product-my-suffix.model';
import { Principal } from 'app/core';
import { ProductMySuffixService } from './product-my-suffix.service';

@Component({
    selector: 'jhi-product-my-suffix',
    templateUrl: './product-my-suffix.component.html'
})
export class ProductMySuffixComponent implements OnInit, OnDestroy {
    products: IProductMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private productService: ProductMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.productService.query().subscribe(
            (res: HttpResponse<IProductMySuffix[]>) => {
                this.products = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProducts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProductMySuffix) {
        return item.id;
    }

    registerChangeInProducts() {
        this.eventSubscriber = this.eventManager.subscribe('productListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
