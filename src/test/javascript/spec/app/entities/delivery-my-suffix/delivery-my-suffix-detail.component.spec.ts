/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { DeliveryMySuffixDetailComponent } from 'app/entities/delivery-my-suffix/delivery-my-suffix-detail.component';
import { DeliveryMySuffix } from 'app/shared/model/delivery-my-suffix.model';

describe('Component Tests', () => {
    describe('DeliveryMySuffix Management Detail Component', () => {
        let comp: DeliveryMySuffixDetailComponent;
        let fixture: ComponentFixture<DeliveryMySuffixDetailComponent>;
        const route = ({ data: of({ delivery: new DeliveryMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [DeliveryMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DeliveryMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DeliveryMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.delivery).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
