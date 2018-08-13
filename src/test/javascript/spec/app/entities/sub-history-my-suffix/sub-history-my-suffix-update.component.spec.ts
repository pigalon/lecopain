/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { SubHistoryMySuffixUpdateComponent } from 'app/entities/sub-history-my-suffix/sub-history-my-suffix-update.component';
import { SubHistoryMySuffixService } from 'app/entities/sub-history-my-suffix/sub-history-my-suffix.service';
import { SubHistoryMySuffix } from 'app/shared/model/sub-history-my-suffix.model';

describe('Component Tests', () => {
    describe('SubHistoryMySuffix Management Update Component', () => {
        let comp: SubHistoryMySuffixUpdateComponent;
        let fixture: ComponentFixture<SubHistoryMySuffixUpdateComponent>;
        let service: SubHistoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubHistoryMySuffixUpdateComponent]
            })
                .overrideTemplate(SubHistoryMySuffixUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubHistoryMySuffixUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubHistoryMySuffixService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubHistoryMySuffix(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subHistory = entity;
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
                    const entity = new SubHistoryMySuffix();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subHistory = entity;
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
