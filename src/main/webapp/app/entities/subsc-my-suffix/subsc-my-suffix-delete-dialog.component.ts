import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';
import { SubscMySuffixService } from './subsc-my-suffix.service';

@Component({
    selector: 'jhi-subsc-my-suffix-delete-dialog',
    templateUrl: './subsc-my-suffix-delete-dialog.component.html'
})
export class SubscMySuffixDeleteDialogComponent {
    subsc: ISubscMySuffix;

    constructor(private subscService: SubscMySuffixService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subscService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subscListModification',
                content: 'Deleted an subsc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subsc-my-suffix-delete-popup',
    template: ''
})
export class SubscMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subsc }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubscMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subsc = subsc;
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
