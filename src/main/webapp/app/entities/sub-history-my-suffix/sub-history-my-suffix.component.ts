import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';
import { Principal } from 'app/core';
import { SubHistoryMySuffixService } from './sub-history-my-suffix.service';

@Component({
    selector: 'jhi-sub-history-my-suffix',
    templateUrl: './sub-history-my-suffix.component.html'
})
export class SubHistoryMySuffixComponent implements OnInit, OnDestroy {
    subHistories: ISubHistoryMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subHistoryService: SubHistoryMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.subHistoryService.query().subscribe(
            (res: HttpResponse<ISubHistoryMySuffix[]>) => {
                this.subHistories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSubHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISubHistoryMySuffix) {
        return item.id;
    }

    registerChangeInSubHistories() {
        this.eventSubscriber = this.eventManager.subscribe('subHistoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
