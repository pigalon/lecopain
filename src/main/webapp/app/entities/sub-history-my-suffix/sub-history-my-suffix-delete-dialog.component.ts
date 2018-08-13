import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';
import { SubHistoryMySuffixService } from './sub-history-my-suffix.service';

@Component({
    selector: 'jhi-sub-history-my-suffix-delete-dialog',
    templateUrl: './sub-history-my-suffix-delete-dialog.component.html'
})
export class SubHistoryMySuffixDeleteDialogComponent {
    subHistory: ISubHistoryMySuffix;

    constructor(
        private subHistoryService: SubHistoryMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subHistoryService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subHistoryListModification',
                content: 'Deleted an subHistory'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-history-my-suffix-delete-popup',
    template: ''
})
export class SubHistoryMySuffixDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subHistory }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubHistoryMySuffixDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subHistory = subHistory;
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
