import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';
import { OrderTimelineService } from './order-timeline.service';

@Component({
    selector: 'jhi-order-timeline-delete-dialog',
    templateUrl: './order-timeline-delete-dialog.component.html'
})
export class OrderTimelineDeleteDialogComponent {
    orderMain: IOrderMainMySuffix;

    constructor(
        private orderMainService: OrderTimelineService,
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
    selector: 'jhi-order-timeline-delete-popup',
    template: ''
})
export class OrderTimelineDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ orderMain }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(OrderTimelineDeleteDialogComponent as Component, {
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
