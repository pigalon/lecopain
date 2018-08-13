import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';
import { OrderCustMySuffixService } from './order-cust-my-suffix.service';

@Component({
    selector: 'jhi-order-cust-my-suffix-delete-dialog',
    templateUrl: './order-cust-my-suffix-delete-dialog.component.html'
})
export class OrderCustMySuffixDeleteDialogComponent {
    orderCust: IOrderCustMySuffix;

    constructor(
        private orderCustService: OrderCustMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderCustService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderCustListModification',
                content: 'Deleted an orderCust'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-cust-my-suffix-delete-popup',
    template: ''
})
export class OrderCustMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderCust }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderCustMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderCust = orderCust;
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
