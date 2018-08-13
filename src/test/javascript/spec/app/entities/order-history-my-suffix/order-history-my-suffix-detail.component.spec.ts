/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderHistoryMySuffixDetailComponent } from 'app/entities/order-history-my-suffix/order-history-my-suffix-detail.component';
import { OrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderHistoryMySuffix Management Detail Component', () => {
        let comp: OrderHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<OrderHistoryMySuffixDetailComponent>;
        const route = ({ data: of({ orderHistory: new OrderHistoryMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderHistoryMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderHistoryMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderHistoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
