/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { OrderMainMySuffixUpdateComponent } from 'app/entities/order-main-my-suffix/order-main-my-suffix-update.component';
import { OrderMainMySuffixService } from 'app/entities/order-main-my-suffix/order-main-my-suffix.service';
import { OrderMainMySuffix } from 'app/shared/model/order-main-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderMainMySuffix Management Update Component', () => {
        let comp: OrderMainMySuffixUpdateComponent;
        let fixture: ComponentFixture<OrderMainMySuffixUpdateComponent>;
        let service: OrderMainMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderMainMySuffixUpdateComponent]
            })
                .overrideTemplate(OrderMainMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderMainMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderMainMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new OrderMainMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderMain = entity;
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
                    const entity = new OrderMainMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.orderMain = entity;
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
