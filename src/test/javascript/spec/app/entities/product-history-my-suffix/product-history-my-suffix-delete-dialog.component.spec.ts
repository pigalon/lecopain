/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { LecopainTestModule } from '../../../test.module';
import { ProductHistoryMySuffixDeleteDialogComponent } from 'app/entities/product-history-my-suffix/product-history-my-suffix-delete-dialog.component';
import { ProductHistoryMySuffixService } from 'app/entities/product-history-my-suffix/product-history-my-suffix.service';

describe('Component Tests', () => {
    describe('ProductHistoryMySuffix Management Delete Component', () => {
        let comp: ProductHistoryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ProductHistoryMySuffixDeleteDialogComponent>;
        let service: ProductHistoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [ProductHistoryMySuffixDeleteDialogComponent]
            })
                .overrideTemplate(ProductHistoryMySuffixDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProductHistoryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductHistoryMySuffixService);
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
