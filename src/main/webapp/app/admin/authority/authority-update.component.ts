import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { JhiLanguageHelper, Authority, AuthorityService } from 'app/core';

@Component({
    selector: 'jhi-authority-update',
    templateUrl: './authority-update.component.html'
})
export class AuthorityUpdateComponent implements OnInit {
    authority: Authority;
    languages: any[];
    authorities: any[];
    isSaving: boolean;

    constructor(
        private languageHelper: JhiLanguageHelper,
        private authorityService: AuthorityService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ authority }) => {
            this.authority = authority.body ? authority.body : authority;
        });
        this.authorities = [];
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });
    }

    previousState() {
        this.router.navigate(['/admin/authority']);
    }

    save() {
        this.isSaving = true;
        if (this.authority.name !== null) {
            this.authorityService.update(this.authority).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        } else {
            this.authorityService.create(this.authority).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
        }
    }

    private onSaveSuccess(result) {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
