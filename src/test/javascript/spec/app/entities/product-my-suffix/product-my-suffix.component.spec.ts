/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { LecopainTestModule } from '../../../test.module';
import { ProductMySuffixComponent } from 'app/entities/product-my-suffix/product-my-suffix.component';
import { ProductMySuffixService } from 'app/entities/product-my-suffix/product-my-suffix.service';
import { ProductMySuffix } from 'app/shared/model/product-my-suffix.model';

describe('Component Tests', () => {
    describe('ProductMySuffix Management Component', () => {
        let comp: ProductMySuffixComponent;
        let fixture: ComponentFixture<ProductMySuffixComponent>;
        let service: ProductMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [LecopainTestModule],
                declarations: [ProductMySuffixComponent],
                providers: []
            })
                .overrideTemplate(ProductMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProductMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProductMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProductMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.products[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
