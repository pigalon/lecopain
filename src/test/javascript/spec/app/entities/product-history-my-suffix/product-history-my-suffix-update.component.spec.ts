/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { ProductHistoryMySuffixUpdateComponent } from 'app/entities/product-history-my-suffix/product-history-my-suffix-update.component';
import { ProductHistoryMySuffixService } from 'app/entities/product-history-my-suffix/product-history-my-suffix.service';
import { ProductHistoryMySuffix } from 'app/shared/model/product-history-my-suffix.model';

describe('Component Tests', () => {
    describe('ProductHistoryMySuffix Management Update Component', () => {
        let comp: ProductHistoryMySuffixUpdateComponent;
        let fixture: ComponentFixture<ProductHistoryMySuffixUpdateComponent>;
        let service: ProductHistoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [ProductHistoryMySuffixUpdateComponent]
            })
                .overrideTemplate(ProductHistoryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductHistoryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductHistoryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProductHistoryMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productHistory = entity;
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
                    const entity = new ProductHistoryMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.productHistory = entity;
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
