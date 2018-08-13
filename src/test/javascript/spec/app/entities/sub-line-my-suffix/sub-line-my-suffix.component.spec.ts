/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LecopainTestModule } from '../../../test.module';
import { SubLineMySuffixComponent } from 'app/entities/sub-line-my-suffix/sub-line-my-suffix.component';
import { SubLineMySuffixService } from 'app/entities/sub-line-my-suffix/sub-line-my-suffix.service';
import { SubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';

describe('Component Tests', () => {
    describe('SubLineMySuffix Management Component', () => {
        let comp: SubLineMySuffixComponent;
        let fixture: ComponentFixture<SubLineMySuffixComponent>;
        let service: SubLineMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubLineMySuffixComponent],
                providers: []
            })
                .overrideTemplate(SubLineMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubLineMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubLineMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SubLineMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.subLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
