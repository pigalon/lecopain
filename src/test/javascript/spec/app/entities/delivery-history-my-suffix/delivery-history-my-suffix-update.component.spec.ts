/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { DeliveryHistoryMySuffixUpdateComponent } from 'app/entities/delivery-history-my-suffix/delivery-history-my-suffix-update.component';
import { DeliveryHistoryMySuffixService } from 'app/entities/delivery-history-my-suffix/delivery-history-my-suffix.service';
import { DeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';

describe('Component Tests', () => {
    describe('DeliveryHistoryMySuffix Management Update Component', () => {
        let comp: DeliveryHistoryMySuffixUpdateComponent;
        let fixture: ComponentFixture<DeliveryHistoryMySuffixUpdateComponent>;
        let service: DeliveryHistoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [DeliveryHistoryMySuffixUpdateComponent]
            })
                .overrideTemplate(DeliveryHistoryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryHistoryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryHistoryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DeliveryHistoryMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.deliveryHistory = entity;
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
                    const entity = new DeliveryHistoryMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.deliveryHistory = entity;
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
