import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';
import { OrderHistoryMySuffixService } from './order-history-my-suffix.service';

@Component({
    selector: 'jhi-order-history-my-suffix-delete-dialog',
    templateUrl: './order-history-my-suffix-delete-dialog.component.html'
})
export class OrderHistoryMySuffixDeleteDialogComponent {
    orderHistory: IOrderHistoryMySuffix;

    constructor(
        private orderHistoryService: OrderHistoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderHistoryListModification',
                content: 'Deleted an orderHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-history-my-suffix-delete-popup',
    template: ''
})
export class OrderHistoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderHistoryMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderHistory = orderHistory;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
