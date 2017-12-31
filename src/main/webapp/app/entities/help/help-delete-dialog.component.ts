import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Help } from './help.model';
import { HelpPopupService } from './help-popup.service';
import { HelpService } from './help.service';

@Component({
    selector: 'jhi-help-delete-dialog',
    templateUrl: './help-delete-dialog.component.html'
})
export class HelpDeleteDialogComponent {

    help: Help;

    constructor(
        private helpService: HelpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.helpService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'helpListModification',
                content: 'Deleted an help'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-help-delete-popup',
    template: ''
})
export class HelpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private helpPopupService: HelpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.helpPopupService
                .open(HelpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
