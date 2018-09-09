import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Authority, AuthorityService } from 'app/core';

@Component({
    selector: 'jhi-authority-delete-dialog',
    templateUrl: './authority-delete-dialog.component.html'
})
export class AuthorityDeleteDialogComponent {
    authority: Authority;

    constructor(private authorityService: AuthorityService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(login) {
        this.authorityService.delete(login).subscribe(response => {
            this.eventManager.broadcast({
                name: 'authorityListModification',
                content: 'Deleted an authority'
            });
            this.activeModal.dismiss(true);
        });
    }
}
