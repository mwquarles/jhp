import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bar } from './bar.model';
import { BarPopupService } from './bar-popup.service';
import { BarService } from './bar.service';

@Component({
    selector: 'jhi-bar-dialog',
    templateUrl: './bar-dialog.component.html'
})
export class BarDialogComponent implements OnInit {

    bar: Bar;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private barService: BarService,
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
        if (this.bar.id !== undefined) {
            this.subscribeToSaveResponse(
                this.barService.update(this.bar));
        } else {
            this.subscribeToSaveResponse(
                this.barService.create(this.bar));
        }
    }

    private subscribeToSaveResponse(result: Observable<Bar>) {
        result.subscribe((res: Bar) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Bar) {
        this.eventManager.broadcast({ name: 'barListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bar-popup',
    template: ''
})
export class BarPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barPopupService: BarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.barPopupService
                    .open(BarDialogComponent as Component, params['id']);
            } else {
                this.barPopupService
                    .open(BarDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
