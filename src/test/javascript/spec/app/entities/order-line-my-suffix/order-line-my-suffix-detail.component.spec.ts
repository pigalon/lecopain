/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderLineMySuffixDetailComponent } from 'app/entities/order-line-my-suffix/order-line-my-suffix-detail.component';
import { OrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderLineMySuffix Management Detail Component', () => {
        let comp: OrderLineMySuffixDetailComponent;
        let fixture: ComponentFixture<OrderLineMySuffixDetailComponent>;
        const route = ({ data: of({ orderLine: new OrderLineMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderLineMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderLineMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderLineMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderLine).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
