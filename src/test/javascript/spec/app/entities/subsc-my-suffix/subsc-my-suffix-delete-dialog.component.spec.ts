/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LecopainTestModule } from '../../../test.module';
import { SubscMySuffixDeleteDialogComponent } from 'app/entities/subsc-my-suffix/subsc-my-suffix-delete-dialog.component';
import { SubscMySuffixService } from 'app/entities/subsc-my-suffix/subsc-my-suffix.service';

describe('Component Tests', () => {
    describe('SubscMySuffix Management Delete Component', () => {
        let comp: SubscMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<SubscMySuffixDeleteDialogComponent>;
        let service: SubscMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [SubscMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(SubscMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubscMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubscMySuffixService);
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
