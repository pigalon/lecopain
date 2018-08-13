/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderCustMySuffixDetailComponent } from 'app/entities/order-cust-my-suffix/order-cust-my-suffix-detail.component';
import { OrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderCustMySuffix Management Detail Component', () => {
        let comp: OrderCustMySuffixDetailComponent;
        let fixture: ComponentFixture<OrderCustMySuffixDetailComponent>;
        const route = ({ data: of({ orderCust: new OrderCustMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderCustMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderCustMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderCustMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderCust).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
