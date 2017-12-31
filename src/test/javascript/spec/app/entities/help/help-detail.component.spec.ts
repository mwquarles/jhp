/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhpTestModule } from '../../../test.module';
import { HelpDetailComponent } from '../../../../../../main/webapp/app/entities/help/help-detail.component';
import { HelpService } from '../../../../../../main/webapp/app/entities/help/help.service';
import { Help } from '../../../../../../main/webapp/app/entities/help/help.model';

describe('Component Tests', () => {

    describe('Help Management Detail Component', () => {
        let comp: HelpDetailComponent;
        let fixture: ComponentFixture<HelpDetailComponent>;
        let service: HelpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhpTestModule],
                declarations: [HelpDetailComponent],
                providers: [
                    HelpService
                ]
            })
            .overrideTemplate(HelpDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HelpDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Help(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.help).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
