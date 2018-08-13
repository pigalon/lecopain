/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LecopainTestModule } from '../../../test.module';
import { SubHistoryMySuffixComponent } from 'app/entities/sub-history-my-suffix/sub-history-my-suffix.component';
import { SubHistoryMySuffixService } from 'app/entities/sub-history-my-suffix/sub-history-my-suffix.service';
import { SubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';

describe('Component Tests', () => {
    describe('SubHistoryMySuffix Management Component', () => {
        let comp: SubHistoryMySuffixComponent;
        let fixture: ComponentFixture<SubHistoryMySuffixComponent>;
        let service: SubHistoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubHistoryMySuffixComponent],
                providers: []
            })
                .overrideTemplate(SubHistoryMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubHistoryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubHistoryMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new SubHistoryMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.subHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
