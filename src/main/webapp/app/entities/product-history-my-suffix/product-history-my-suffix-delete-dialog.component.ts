import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductHistoryMySuffix } from 'app/shared/model/product-history-my-suffix.model';
import { ProductHistoryMySuffixService } from './product-history-my-suffix.service';

@Component({
    selector: 'jhi-product-history-my-suffix-delete-dialog',
    templateUrl: './product-history-my-suffix-delete-dialog.component.html'
})
export class ProductHistoryMySuffixDeleteDialogComponent {
    productHistory: IProductHistoryMySuffix;

    constructor(
        private productHistoryService: ProductHistoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.productHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'productHistoryListModification',
                content: 'Deleted an productHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-product-history-my-suffix-delete-popup',
    template: ''
})
export class ProductHistoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProductHistoryMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.productHistory = productHistory;
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
