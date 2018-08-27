import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';
import { OrderMainMySuffixService } from './order-main-my-suffix.service';

@Component({
    selector: 'jhi-order-main-my-suffix-delete-dialog',
    templateUrl: './order-main-my-suffix-delete-dialog.component.html'
})
export class OrderMainMySuffixDeleteDialogComponent {
    orderMain: IOrderMainMySuffix;

    constructor(
        private orderMainService: OrderMainMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.orderMainService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'orderMainListModification',
                content: 'Deleted an orderMain'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-order-main-my-suffix-delete-popup',
    template: ''
})
export class OrderMainMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderMain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderMainMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.orderMain = orderMain;
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
