import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Authority } from 'app/core';

@Component({
    selector: 'jhi-authority-detail',
    templateUrl: './authority-detail.component.html'
})
export class AuthorityDetailComponent implements OnInit {
    authority: Authority;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ authority }) => {
            this.authority = authority.body ? authority.body : authority;
        });
    }
}
