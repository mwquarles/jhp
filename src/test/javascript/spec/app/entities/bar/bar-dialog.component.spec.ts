/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhpTestModule } from '../../../test.module';
import { BarDialogComponent } from '../../../../../../main/webapp/app/entities/bar/bar-dialog.component';
import { BarService } from '../../../../../../main/webapp/app/entities/bar/bar.service';
import { Bar } from '../../../../../../main/webapp/app/entities/bar/bar.model';

describe('Component Tests', () => {

    describe('Bar Management Dialog Component', () => {
        let comp: BarDialogComponent;
        let fixture: ComponentFixture<BarDialogComponent>;
        let service: BarService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhpTestModule],
                declarations: [BarDialogComponent],
                providers: [
                    BarService
                ]
            })
            .overrideTemplate(BarDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BarDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BarService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Bar(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.bar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'barListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Bar();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.bar = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'barListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
