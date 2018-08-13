/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { SubHistoryMySuffixDetailComponent } from 'app/entities/sub-history-my-suffix/sub-history-my-suffix-detail.component';
import { SubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';

describe('Component Tests', () => {
    describe('SubHistoryMySuffix Management Detail Component', () => {
        let comp: SubHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<SubHistoryMySuffixDetailComponent>;
        const route = ({ data: of({ subHistory: new SubHistoryMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubHistoryMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubHistoryMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubHistoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
