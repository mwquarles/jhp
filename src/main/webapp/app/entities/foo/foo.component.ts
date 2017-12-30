import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Foo } from './foo.model';
import { FooService } from './foo.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-foo',
    templateUrl: './foo.component.html'
})
export class FooComponent implements OnInit, OnDestroy {
foos: Foo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private fooService: FooService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.fooService.query().subscribe(
            (res: ResponseWrapper) => {
                this.foos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFoos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Foo) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInFoos() {
        this.eventSubscriber = this.eventManager.subscribe('fooListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
