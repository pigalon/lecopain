/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderMainMySuffixDetailComponent } from 'app/entities/order-main-my-suffix/order-main-my-suffix-detail.component';
import { OrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderMainMySuffix Management Detail Component', () => {
        let comp: OrderMainMySuffixDetailComponent;
        let fixture: ComponentFixture<OrderMainMySuffixDetailComponent>;
        const route = ({ data: of({ orderMain: new OrderMainMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderMainMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(OrderMainMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderMainMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.orderMain).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
