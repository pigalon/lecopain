/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LecopainTestModule } from '../../../test.module';
import { CustomerMySuffixDeleteDialogComponent } from 'app/entities/customer-my-suffix/customer-my-suffix-delete-dialog.component';
import { CustomerMySuffixService } from 'app/entities/customer-my-suffix/customer-my-suffix.service';

describe('Component Tests', () => {
    describe('CustomerMySuffix Management Delete Component', () => {
        let comp: CustomerMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CustomerMySuffixDeleteDialogComponent>;
        let service: CustomerMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [CustomerMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(CustomerMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CustomerMySuffixService);
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
