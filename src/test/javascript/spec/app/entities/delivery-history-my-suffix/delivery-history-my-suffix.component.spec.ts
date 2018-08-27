/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LecopainTestModule } from '../../../test.module';
import { DeliveryHistoryMySuffixComponent } from 'app/entities/delivery-history-my-suffix/delivery-history-my-suffix.component';
import { DeliveryHistoryMySuffixService } from 'app/entities/delivery-history-my-suffix/delivery-history-my-suffix.service';
import { DeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';

describe('Component Tests', () => {
    describe('DeliveryHistoryMySuffix Management Component', () => {
        let comp: DeliveryHistoryMySuffixComponent;
        let fixture: ComponentFixture<DeliveryHistoryMySuffixComponent>;
        let service: DeliveryHistoryMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [DeliveryHistoryMySuffixComponent],
                providers: []
            })
                .overrideTemplate(DeliveryHistoryMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DeliveryHistoryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeliveryHistoryMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DeliveryHistoryMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.deliveryHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
