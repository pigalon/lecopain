/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { SubLineMySuffixUpdateComponent } from 'app/entities/sub-line-my-suffix/sub-line-my-suffix-update.component';
import { SubLineMySuffixService } from 'app/entities/sub-line-my-suffix/sub-line-my-suffix.service';
import { SubLineMySuffix } from 'app/shared/model/sub-line-my-suffix.model';

describe('Component Tests', () => {
    describe('SubLineMySuffix Management Update Component', () => {
        let comp: SubLineMySuffixUpdateComponent;
        let fixture: ComponentFixture<SubLineMySuffixUpdateComponent>;
        let service: SubLineMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubLineMySuffixUpdateComponent]
            })
                .overrideTemplate(SubLineMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubLineMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubLineMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubLineMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subLine = entity;
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
                    const entity = new SubLineMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subLine = entity;
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
