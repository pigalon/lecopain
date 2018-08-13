/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderHistoryMySuffixUpdateComponent } from 'app/entities/order-history-my-suffix/order-history-my-suffix-update.component';
import { OrderHistoryMySuffixService } from 'app/entities/order-history-my-suffix/order-history-my-suffix.service';
import { OrderHistoryMySuffix } from 'app/shared/model/order-history-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderHistoryMySuffix Management Update Component', () => {
        let comp: OrderHistoryMySuffixUpdateComponent;
        let fixture: ComponentFixture<OrderHistoryMySuffixUpdateComponent>;
        let service: OrderHistoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderHistoryMySuffixUpdateComponent]
            })
                .overrideTemplate(OrderHistoryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderHistoryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderHistoryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderHistoryMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderHistory = entity;
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
                    const entity = new OrderHistoryMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderHistory = entity;
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
