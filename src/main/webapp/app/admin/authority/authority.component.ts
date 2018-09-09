import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITEMS_PER_PAGE } from 'app/shared';
import { Principal, AuthorityService, Authority } from 'app/core';
import { AuthorityDeleteDialogComponent } from 'app/admin';

@Component({
    selector: 'jhi-authority',
    templateUrl: './authority.component.html'
})
export class AuthorityComponent implements OnInit, OnDestroy {
    currentAccount: any;
    authorities: Authority[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private authorityService: AuthorityService,
        private alertService: JhiAlertService,
        private principal: Principal,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAuthorities();
    }

    ngOnDestroy() {
        this.routeData.unsubscribe();
    }

    registerChangeInAuthorities() {
        this.eventManager.subscribe('authorityListModification', response => this.loadAll());
    }

    loadAll() {
        this.authorityService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage
                // sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<Authority[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
    }

    trackIdentity(index: string, item: Authority) {
        return item.name;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/admin/authority'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    deleteAuthority(authority: Authority) {
        const modalRef = this.modalService.open(AuthorityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.authority = authority;
        modalRef.result.then(
            result => {
                // Left blank intentionally, nothing to do here
            },
            reason => {
                // Left blank intentionally, nothing to do here
            }
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.authorities = data;
    }

    private onError(error) {
        this.alertService.error(error.error, error.message, null);
    }
}
