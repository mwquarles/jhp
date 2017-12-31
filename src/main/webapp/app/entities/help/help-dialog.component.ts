import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Help } from './help.model';
import { HelpPopupService } from './help-popup.service';
import { HelpService } from './help.service';

@Component({
    selector: 'jhi-help-dialog',
    templateUrl: './help-dialog.component.html'
})
export class HelpDialogComponent implements OnInit {

    help: Help;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private helpService: HelpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.help.id !== undefined) {
            this.subscribeToSaveResponse(
                this.helpService.update(this.help));
        } else {
            this.subscribeToSaveResponse(
                this.helpService.create(this.help));
        }
    }

    private subscribeToSaveResponse(result: Observable<Help>) {
        result.subscribe((res: Help) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Help) {
        this.eventManager.broadcast({ name: 'helpListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-help-popup',
    template: ''
})
export class HelpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private helpPopupService: HelpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.helpPopupService
                    .open(HelpDialogComponent as Component, params['id']);
            } else {
                this.helpPopupService
                    .open(HelpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
