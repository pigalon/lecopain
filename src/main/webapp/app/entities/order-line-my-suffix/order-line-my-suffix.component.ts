import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';
import { Principal } from 'app/core';
import { OrderLineMySuffixService } from './order-line-my-suffix.service';

@Component({
    selector: 'jhi-order-line-my-suffix',
    templateUrl: './order-line-my-suffix.component.html'
})
export class OrderLineMySuffixComponent implements OnInit, OnDestroy {
    orderLines: IOrderLineMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private orderLineService: OrderLineMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.orderLineService.query().subscribe(
            (res: HttpResponse<IOrderLineMySuffix[]>) => {
                this.orderLines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInOrderLines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IOrderLineMySuffix) {
        return item.id;
    }

    registerChangeInOrderLines() {
        this.eventSubscriber = this.eventManager.subscribe('orderLineListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
