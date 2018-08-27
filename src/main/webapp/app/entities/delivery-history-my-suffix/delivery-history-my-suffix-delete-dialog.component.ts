import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';
import { DeliveryHistoryMySuffixService } from './delivery-history-my-suffix.service';

@Component({
    selector: 'jhi-delivery-history-my-suffix-delete-dialog',
    templateUrl: './delivery-history-my-suffix-delete-dialog.component.html'
})
export class DeliveryHistoryMySuffixDeleteDialogComponent {
    deliveryHistory: IDeliveryHistoryMySuffix;

    constructor(
        private deliveryHistoryService: DeliveryHistoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.deliveryHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deliveryHistoryListModification',
                content: 'Deleted an deliveryHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delivery-history-my-suffix-delete-popup',
    template: ''
})
export class DeliveryHistoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ deliveryHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DeliveryHistoryMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.deliveryHistory = deliveryHistory;
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
