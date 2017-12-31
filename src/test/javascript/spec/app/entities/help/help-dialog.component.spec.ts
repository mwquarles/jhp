/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhpTestModule } from '../../../test.module';
import { HelpDialogComponent } from '../../../../../../main/webapp/app/entities/help/help-dialog.component';
import { HelpService } from '../../../../../../main/webapp/app/entities/help/help.service';
import { Help } from '../../../../../../main/webapp/app/entities/help/help.model';

describe('Component Tests', () => {

    describe('Help Management Dialog Component', () => {
        let comp: HelpDialogComponent;
        let fixture: ComponentFixture<HelpDialogComponent>;
        let service: HelpService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhpTestModule],
                declarations: [HelpDialogComponent],
                providers: [
                    HelpService
                ]
            })
            .overrideTemplate(HelpDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HelpDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Help(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.help = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'helpListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Help();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.help = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'helpListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
