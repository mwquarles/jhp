import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bar } from './bar.model';
import { BarPopupService } from './bar-popup.service';
import { BarService } from './bar.service';

@Component({
    selector: 'jhi-bar-delete-dialog',
    templateUrl: './bar-delete-dialog.component.html'
})
export class BarDeleteDialogComponent {

    bar: Bar;

    constructor(
        private barService: BarService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.barService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'barListModification',
                content: 'Deleted an bar'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bar-delete-popup',
    template: ''
})
export class BarDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private barPopupService: BarPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.barPopupService
                .open(BarDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
