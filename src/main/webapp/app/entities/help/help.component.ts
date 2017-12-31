import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Help } from './help.model';
import { HelpService } from './help.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-help',
    templateUrl: './help.component.html'
})
export class HelpComponent implements OnInit, OnDestroy {
helps: Help[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private helpService: HelpService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.helpService.query().subscribe(
            (res: ResponseWrapper) => {
                this.helps = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInHelps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Help) {
        return item.id;
    }
    registerChangeInHelps() {
        this.eventSubscriber = this.eventManager.subscribe('helpListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
