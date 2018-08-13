/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { CustomerMySuffixUpdateComponent } from 'app/entities/customer-my-suffix/customer-my-suffix-update.component';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix/customer-my-suffix.service';
import { CustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';

describe('Component Tests', () => {
    describe('CustomerMySuffix Management Update Component', () => {
        let comp: CustomerMySuffixUpdateComponent;
        let fixture: ComponentFixture<CustomerMySuffixUpdateComponent>;
        let service: CustomerMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [CustomerMySuffixUpdateComponent]
            })
                .overrideTemplate(CustomerMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CustomerMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CustomerMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customer = entity;
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
                    const entity = new CustomerMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.customer = entity;
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
