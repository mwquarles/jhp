import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Foo } from './foo.model';
import { FooService } from './foo.service';

@Component({
    selector: 'jhi-foo-detail',
    templateUrl: './foo-detail.component.html'
})
export class FooDetailComponent implements OnInit, OnDestroy {

    foo: Foo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private fooService: FooService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFoos();
    }

    load(id) {
        this.fooService.find(id).subscribe((foo) => {
            this.foo = foo;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFoos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fooListModification',
            (response) => this.load(this.foo.id)
        );
    }
}
