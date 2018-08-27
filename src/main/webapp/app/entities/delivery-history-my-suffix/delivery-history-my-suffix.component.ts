import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';
import { Principal } from 'app/core';
import { DeliveryHistoryMySuffixService } from './delivery-history-my-suffix.service';

@Component({
    selector: 'jhi-delivery-history-my-suffix',
    templateUrl: './delivery-history-my-suffix.component.html'
})
export class DeliveryHistoryMySuffixComponent implements OnInit, OnDestroy {
    deliveryHistories: IDeliveryHistoryMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private deliveryHistoryService: DeliveryHistoryMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.deliveryHistoryService.query().subscribe(
            (res: HttpResponse<IDeliveryHistoryMySuffix[]>) => {
                this.deliveryHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDeliveryHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDeliveryHistoryMySuffix) {
        return item.id;
    }

    registerChangeInDeliveryHistories() {
        this.eventSubscriber = this.eventManager.subscribe('deliveryHistoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
