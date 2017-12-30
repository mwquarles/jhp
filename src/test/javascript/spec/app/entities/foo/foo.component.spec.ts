/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhpTestModule } from '../../../test.module';
import { FooComponent } from '../../../../../../main/webapp/app/entities/foo/foo.component';
import { FooService } from '../../../../../../main/webapp/app/entities/foo/foo.service';
import { Foo } from '../../../../../../main/webapp/app/entities/foo/foo.model';

describe('Component Tests', () => {

    describe('Foo Management Component', () => {
        let comp: FooComponent;
        let fixture: ComponentFixture<FooComponent>;
        let service: FooService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhpTestModule],
                declarations: [FooComponent],
                providers: [
                    FooService
                ]
            })
            .overrideTemplate(FooComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FooComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FooService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Foo(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.foos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
