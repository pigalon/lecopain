/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { SubscMySuffixDetailComponent } from 'app/entities/subsc-my-suffix/subsc-my-suffix-detail.component';
import { SubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';

describe('Component Tests', () => {
    describe('SubscMySuffix Management Detail Component', () => {
        let comp: SubscMySuffixDetailComponent;
        let fixture: ComponentFixture<SubscMySuffixDetailComponent>;
        const route = ({ data: of({ subsc: new SubscMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubscMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubscMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubscMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subsc).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
