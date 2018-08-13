/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { SubscMySuffixUpdateComponent } from 'app/entities/subsc-my-suffix/subsc-my-suffix-update.component';
import { SubscMySuffixService } from 'app/entities/subsc-my-suffix/subsc-my-suffix.service';
import { SubscMySuffix } from 'app/shared/model/subsc-my-suffix.model';

describe('Component Tests', () => {
    describe('SubscMySuffix Management Update Component', () => {
        let comp: SubscMySuffixUpdateComponent;
        let fixture: ComponentFixture<SubscMySuffixUpdateComponent>;
        let service: SubscMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubscMySuffixUpdateComponent]
            })
                .overrideTemplate(SubscMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubscMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubscMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subsc = entity;
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
                    const entity = new SubscMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subsc = entity;
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
