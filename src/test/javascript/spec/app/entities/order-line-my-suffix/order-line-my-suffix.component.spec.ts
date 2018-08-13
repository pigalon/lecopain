/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LecopainTestModule } from '../../../test.module';
import { OrderLineMySuffixComponent } from 'app/entities/order-line-my-suffix/order-line-my-suffix.component';
import { OrderLineMySuffixService } from 'app/entities/order-line-my-suffix/order-line-my-suffix.service';
import { OrderLineMySuffix } from 'app/shared/model/order-line-my-suffix.model';

describe('Component Tests', () => {
    describe('OrderLineMySuffix Management Component', () => {
        let comp: OrderLineMySuffixComponent;
        let fixture: ComponentFixture<OrderLineMySuffixComponent>;
        let service: OrderLineMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [OrderLineMySuffixComponent],
                providers: []
            })
                .overrideTemplate(OrderLineMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(OrderLineMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrderLineMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new OrderLineMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.orderLines[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
