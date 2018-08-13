/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { SubLineMySuffixDetailComponent } from 'app/entities/sub-line-my-suffix/sub-line-my-suffix-detail.component';
import { SubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';

describe('Component Tests', () => {
    describe('SubLineMySuffix Management Detail Component', () => {
        let comp: SubLineMySuffixDetailComponent;
        let fixture: ComponentFixture<SubLineMySuffixDetailComponent>;
        const route = ({ data: of({ subLine: new SubLineMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubLineMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubLineMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubLineMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subLine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
