/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { LecopainTestModule } from '../../../test.module';
import { CustomerMySuffixDetailComponent } from 'app/entities/customer-my-suffix/customer-my-suffix-detail.component';
import { CustomerMySuffix } from 'app/shared/model/customer-my-suffix.model';

describe('Component Tests', () => {
    describe('CustomerMySuffix Management Detail Component', () => {
        let comp: CustomerMySuffixDetailComponent;
        let fixture: ComponentFixture<CustomerMySuffixDetailComponent>;
        const route = ({ data: of({ customer: new CustomerMySuffix(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [CustomerMySuffixDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CustomerMySuffixDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CustomerMySuffixDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.customer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
