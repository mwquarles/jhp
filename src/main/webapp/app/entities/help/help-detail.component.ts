import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Help } from './help.model';
import { HelpService } from './help.service';

@Component({
    selector: 'jhi-help-detail',
    templateUrl: './help-detail.component.html'
})
export class HelpDetailComponent implements OnInit, OnDestroy {

    help: Help;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private helpService: HelpService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHelps();
    }

    load(id) {
        this.helpService.find(id).subscribe((help) => {
            this.help = help;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHelps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'helpListModification',
            (response) => this.load(this.help.id)
        );
    }
}
