/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhpTestModule } from '../../../test.module';
import { FooDetailComponent } from '../../../../../../main/webapp/app/entities/foo/foo-detail.component';
import { FooService } from '../../../../../../main/webapp/app/entities/foo/foo.service';
import { Foo } from '../../../../../../main/webapp/app/entities/foo/foo.model';

describe('Component Tests', () => {

    describe('Foo Management Detail Component', () => {
        let comp: FooDetailComponent;
        let fixture: ComponentFixture<FooDetailComponent>;
        let service: FooService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhpTestModule],
                declarations: [FooDetailComponent],
                providers: [
                    FooService
                ]
            })
            .overrideTemplate(FooDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FooDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FooService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new Foo(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.foo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
