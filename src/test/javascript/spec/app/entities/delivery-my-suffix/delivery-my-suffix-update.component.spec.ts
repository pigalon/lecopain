/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { DeliveryMySuffixUpdateComponent } from 'app/entities/delivery-my-suffix/delivery-my-suffix-update.component';
import { DeliveryMySuffixService } from 'app/entities/delivery-my-suffix/delivery-my-suffix.service';
import { DeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';

describe('Component Tests', () => {
    describe('DeliveryMySuffix Management Update Component', () => {
        let comp: DeliveryMySuffixUpdateComponent;
        let fixture: ComponentFixture<DeliveryMySuffixUpdateComponent>;
        let service: DeliveryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [DeliveryMySuffixUpdateComponent]
            })
                .overrideTemplate(DeliveryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DeliveryMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.delivery = entity;
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
                    const entity = new DeliveryMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.delivery = entity;
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
