package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.service.ProductHistoryService;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.web.rest.util.PaginationUtil;
import com.pigalon.lecopain.service.dto.ProductHistoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductHistory.
 */
@RestController
@RequestMapping("/api")
public class ProductHistoryResource {

    private final Logger log = LoggerFactory.getLogger(ProductHistoryResource.class);

    private static final String ENTITY_NAME = "productHistory";

    private final ProductHistoryService productHistoryService;

    public ProductHistoryResource(ProductHistoryService productHistoryService) {
        this.productHistoryService = productHistoryService;
    }

    /**
     * POST  /product-histories : Create a new productHistory.
     *
     * @param productHistoryDTO the productHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productHistoryDTO, or with status 400 (Bad Request) if the productHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-histories")
    @Timed
    public ResponseEntity<ProductHistoryDTO> createProductHistory(@RequestBody ProductHistoryDTO productHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save ProductHistory : {}", productHistoryDTO);
        if (productHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new productHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductHistoryDTO result = productHistoryService.save(productHistoryDTO);
        return ResponseEntity.created(new URI("/api/product-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-histories : Updates an existing productHistory.
     *
     * @param productHistoryDTO the productHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productHistoryDTO,
     * or with status 400 (Bad Request) if the productHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the productHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-histories")
    @Timed
    public ResponseEntity<ProductHistoryDTO> updateProductHistory(@RequestBody ProductHistoryDTO productHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update ProductHistory : {}", productHistoryDTO);
        if (productHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductHistoryDTO result = productHistoryService.save(productHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-histories : get all the productHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of productHistories in body
     */
    @GetMapping("/product-histories")
    @Timed
    public ResponseEntity<List<ProductHistoryDTO>> getAllProductHistories(Pageable pageable) {
        log.debug("REST request to get a page of ProductHistories");
        Page<ProductHistoryDTO> page = productHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/product-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /product-histories/:id : get the "id" productHistory.
     *
     * @param id the id of the productHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-histories/{id}")
    @Timed
    public ResponseEntity<ProductHistoryDTO> getProductHistory(@PathVariable Long id) {
        log.debug("REST request to get ProductHistory : {}", id);
        Optional<ProductHistoryDTO> productHistoryDTO = productHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productHistoryDTO);
    }

    /**
     * DELETE  /product-histories/:id : delete the "id" productHistory.
     *
     * @param id the id of the productHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductHistory(@PathVariable Long id) {
        log.debug("REST request to delete ProductHistory : {}", id);
        productHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
