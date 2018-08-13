package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.service.OrderLineService;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.service.dto.OrderLineDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing OrderLine.
 */
@RestController
@RequestMapping("/api")
public class OrderLineResource {

    private final Logger log = LoggerFactory.getLogger(OrderLineResource.class);

    private static final String ENTITY_NAME = "orderLine";

    private final OrderLineService orderLineService;

    public OrderLineResource(OrderLineService orderLineService) {
        this.orderLineService = orderLineService;
    }

    /**
     * POST  /order-lines : Create a new orderLine.
     *
     * @param orderLineDTO the orderLineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderLineDTO, or with status 400 (Bad Request) if the orderLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-lines")
    @Timed
    public ResponseEntity<OrderLineDTO> createOrderLine(@RequestBody OrderLineDTO orderLineDTO) throws URISyntaxException {
        log.debug("REST request to save OrderLine : {}", orderLineDTO);
        if (orderLineDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderLineDTO result = orderLineService.save(orderLineDTO);
        return ResponseEntity.created(new URI("/api/order-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-lines : Updates an existing orderLine.
     *
     * @param orderLineDTO the orderLineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderLineDTO,
     * or with status 400 (Bad Request) if the orderLineDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderLineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-lines")
    @Timed
    public ResponseEntity<OrderLineDTO> updateOrderLine(@RequestBody OrderLineDTO orderLineDTO) throws URISyntaxException {
        log.debug("REST request to update OrderLine : {}", orderLineDTO);
        if (orderLineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderLineDTO result = orderLineService.save(orderLineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderLineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-lines : get all the orderLines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of orderLines in body
     */
    @GetMapping("/order-lines")
    @Timed
    public List<OrderLineDTO> getAllOrderLines() {
        log.debug("REST request to get all OrderLines");
        return orderLineService.findAll();
    }

    /**
     * GET  /order-lines/:id : get the "id" orderLine.
     *
     * @param id the id of the orderLineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderLineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-lines/{id}")
    @Timed
    public ResponseEntity<OrderLineDTO> getOrderLine(@PathVariable Long id) {
        log.debug("REST request to get OrderLine : {}", id);
        Optional<OrderLineDTO> orderLineDTO = orderLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(orderLineDTO);
    }

    /**
     * DELETE  /order-lines/:id : delete the "id" orderLine.
     *
     * @param id the id of the orderLineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-lines/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderLine(@PathVariable Long id) {
        log.debug("REST request to delete OrderLine : {}", id);
        orderLineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
