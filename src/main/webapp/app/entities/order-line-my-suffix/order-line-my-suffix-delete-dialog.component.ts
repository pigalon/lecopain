import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';
import { OrderLineMySuffixService } from './order-line-my-suffix.service';

@Component({
    selector: 'jhi-order-line-my-suffix-delete-dialog',
    templateUrl: './order-line-my-suffix-delete-dialog.component.html'
})
export class OrderLineMySuffixDeleteDialogComponent {
    orderLine: IOrderLineMySuffix;

    constructor(
        private orderLineService: OrderLineMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderLineService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderLineListModification',
                content: 'Deleted an orderLine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-line-my-suffix-delete-popup',
    template: ''
})
export class OrderLineMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderLine }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderLineMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderLine = orderLine;
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
