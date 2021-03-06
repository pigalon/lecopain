/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LecopainTestModule } from '../../../test.module';
import { OrderLineMySuffixDeleteDialogComponent } from 'app/entities/order-line-my-suffix/order-line-my-suffix-delete-dialog.component';
import { OrderLineMySuffixService } from 'app/entities/order-line-my-suffix/order-line-my-suffix.service';

describe('Component Tests', () => {
    describe('OrderLineMySuffix Management Delete Component', () => {
        let comp: OrderLineMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<OrderLineMySuffixDeleteDialogComponent>;
        let service: OrderLineMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderLineMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(OrderLineMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(OrderLineMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderLineMySuffixService);
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
