/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { DeliveryHistoryMySuffixDetailComponent } from 'app/entities/delivery-history-my-suffix/delivery-history-my-suffix-detail.component';
import { DeliveryHistoryMySuffix } from 'app/shared/model/delivery-history-my-suffix.model';

describe('Component Tests', () => {
    describe('DeliveryHistoryMySuffix Management Detail Component', () => {
        let comp: DeliveryHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<DeliveryHistoryMySuffixDetailComponent>;
        const route = ({ data: of({ deliveryHistory: new DeliveryHistoryMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [DeliveryHistoryMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DeliveryHistoryMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryHistoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.deliveryHistory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
