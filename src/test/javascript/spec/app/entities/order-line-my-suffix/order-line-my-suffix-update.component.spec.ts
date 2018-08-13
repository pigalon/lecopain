/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderLineMySuffixUpdateComponent } from 'app/entities/order-line-my-suffix/order-line-my-suffix-update.component';
import { OrderLineMySuffixService } from 'app/entities/order-line-my-suffix/order-line-my-suffix.service';
import { OrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderLineMySuffix Management Update Component', () => {
        let comp: OrderLineMySuffixUpdateComponent;
        let fixture: ComponentFixture<OrderLineMySuffixUpdateComponent>;
        let service: OrderLineMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderLineMySuffixUpdateComponent]
            })
                .overrideTemplate(OrderLineMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderLineMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderLineMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderLineMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderLine = entity;
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
                    const entity = new OrderLineMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderLine = entity;
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
