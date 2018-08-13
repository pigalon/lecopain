/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LecopainTestModule } from '../../../test.module';
import { SubLineMySuffixDeleteDialogComponent } from 'app/entities/sub-line-my-suffix/sub-line-my-suffix-delete-dialog.component';
import { SubLineMySuffixService } from 'app/entities/sub-line-my-suffix/sub-line-my-suffix.service';

describe('Component Tests', () => {
    describe('SubLineMySuffix Management Delete Component', () => {
        let comp: SubLineMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SubLineMySuffixDeleteDialogComponent>;
        let service: SubLineMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubLineMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(SubLineMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubLineMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubLineMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
