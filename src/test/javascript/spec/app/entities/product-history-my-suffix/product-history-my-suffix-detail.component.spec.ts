/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { ProductHistoryMySuffixDetailComponent } from 'app/entities/product-history-my-suffix/product-history-my-suffix-detail.component';
import { ProductHistoryMySuffix } from 'app/shared/model/product-history-my-suffix.model';

describe('Component Tests', () => {
    describe('ProductHistoryMySuffix Management Detail Component', () => {
        let comp: ProductHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<ProductHistoryMySuffixDetailComponent>;
        const route = ({ data: of({ productHistory: new ProductHistoryMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [ProductHistoryMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProductHistoryMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductHistoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.productHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
