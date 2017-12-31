/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhpTestModule } from '../../../test.module';
import { HelpComponent } from '../../../../../../main/webapp/app/entities/help/help.component';
import { HelpService } from '../../../../../../main/webapp/app/entities/help/help.service';
import { Help } from '../../../../../../main/webapp/app/entities/help/help.model';

describe('Component Tests', () => {

    describe('Help Management Component', () => {
        let comp: HelpComponent;
        let fixture: ComponentFixture<HelpComponent>;
        let service: HelpService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhpTestModule],
                declarations: [HelpComponent],
                providers: [
                    HelpService
                ]
            })
            .overrideTemplate(HelpComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HelpComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HelpService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Help(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.helps[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
