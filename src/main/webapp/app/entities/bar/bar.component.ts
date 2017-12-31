import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bar } from './bar.model';
import { BarService } from './bar.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bar',
    templateUrl: './bar.component.html'
})
export class BarComponent implements OnInit, OnDestroy {
bars: Bar[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private barService: BarService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.barService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bars = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBars();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Bar) {
        return item.id;
    }
    registerChangeInBars() {
        this.eventSubscriber = this.eventManager.subscribe('barListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
