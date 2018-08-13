/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LecopainTestModule } from '../../../test.module';
import { SubHistoryMySuffixDeleteDialogComponent } from 'app/entities/sub-history-my-suffix/sub-history-my-suffix-delete-dialog.component';
import { SubHistoryMySuffixService } from 'app/entities/sub-history-my-suffix/sub-history-my-suffix.service';

describe('Component Tests', () => {
    describe('SubHistoryMySuffix Management Delete Component', () => {
        let comp: SubHistoryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SubHistoryMySuffixDeleteDialogComponent>;
        let service: SubHistoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubHistoryMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(SubHistoryMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubHistoryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubHistoryMySuffixService);
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
