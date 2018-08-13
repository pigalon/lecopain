/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderCustMySuffixUpdateComponent } from 'app/entities/order-cust-my-suffix/order-cust-my-suffix-update.component';
import { OrderCustMySuffixService } from 'app/entities/order-cust-my-suffix/order-cust-my-suffix.service';
import { OrderCustMySuffix } from 'app/shared/model/order-cust-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderCustMySuffix Management Update Component', () => {
        let comp: OrderCustMySuffixUpdateComponent;
        let fixture: ComponentFixture<OrderCustMySuffixUpdateComponent>;
        let service: OrderCustMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderCustMySuffixUpdateComponent]
            })
                .overrideTemplate(OrderCustMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderCustMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderCustMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderCustMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderCust = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderCustMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderCust = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
