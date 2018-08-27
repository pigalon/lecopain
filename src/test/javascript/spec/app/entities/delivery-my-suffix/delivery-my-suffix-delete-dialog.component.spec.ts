/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LecopainTestModule } from '../../../test.module';
import { DeliveryMySuffixDeleteDialogComponent } from 'app/entities/delivery-my-suffix/delivery-my-suffix-delete-dialog.component';
import { DeliveryMySuffixService } from 'app/entities/delivery-my-suffix/delivery-my-suffix.service';

describe('Component Tests', () => {
    describe('DeliveryMySuffix Management Delete Component', () => {
        let comp: DeliveryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DeliveryMySuffixDeleteDialogComponent>;
        let service: DeliveryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [DeliveryMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(DeliveryMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryMySuffixService);
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
