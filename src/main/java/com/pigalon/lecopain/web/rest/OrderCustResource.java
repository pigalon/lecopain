package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.domain.OrderCust;
import com.pigalon.lecopain.repository.OrderCustRepository;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.web.rest.util.PaginationUtil;
import com.pigalon.lecopain.service.dto.OrderCustDTO;
import com.pigalon.lecopain.service.mapper.OrderCustMapper;
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
 * REST controller for managing OrderCust.
 */
@RestController
@RequestMapping("/api")
public class OrderCustResource {

    private final Logger log = LoggerFactory.getLogger(OrderCustResource.class);

    private static final String ENTITY_NAME = "orderCust";

    private final OrderCustRepository orderCustRepository;

    private final OrderCustMapper orderCustMapper;

    public OrderCustResource(OrderCustRepository orderCustRepository, OrderCustMapper orderCustMapper) {
        this.orderCustRepository = orderCustRepository;
        this.orderCustMapper = orderCustMapper;
    }

    /**
     * POST  /order-custs : Create a new orderCust.
     *
     * @param orderCustDTO the orderCustDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderCustDTO, or with status 400 (Bad Request) if the orderCust has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-custs")
    @Timed
    public ResponseEntity<OrderCustDTO> createOrderCust(@RequestBody OrderCustDTO orderCustDTO) throws URISyntaxException {
        log.debug("REST request to save OrderCust : {}", orderCustDTO);
        if (orderCustDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderCust cannot already have an ID", ENTITY_NAME, "idexists");
        }

        OrderCust orderCust = orderCustMapper.toEntity(orderCustDTO);
        orderCust = orderCustRepository.save(orderCust);
        OrderCustDTO result = orderCustMapper.toDto(orderCust);
        return ResponseEntity.created(new URI("/api/order-custs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-custs : Updates an existing orderCust.
     *
     * @param orderCustDTO the orderCustDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderCustDTO,
     * or with status 400 (Bad Request) if the orderCustDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderCustDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-custs")
    @Timed
    public ResponseEntity<OrderCustDTO> updateOrderCust(@RequestBody OrderCustDTO orderCustDTO) throws URISyntaxException {
        log.debug("REST request to update OrderCust : {}", orderCustDTO);
        if (orderCustDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        OrderCust orderCust = orderCustMapper.toEntity(orderCustDTO);
        orderCust = orderCustRepository.save(orderCust);
        OrderCustDTO result = orderCustMapper.toDto(orderCust);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderCustDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-custs : get all the orderCusts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of orderCusts in body
     */
    @GetMapping("/order-custs")
    @Timed
    public ResponseEntity<List<OrderCustDTO>> getAllOrderCusts(Pageable pageable) {
        log.debug("REST request to get a page of OrderCusts");
        Page<OrderCustDTO> page = orderCustRepository.findAll(pageable).map(orderCustMapper::toDto);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/order-custs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /order-custs/:id : get the "id" orderCust.
     *
     * @param id the id of the orderCustDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderCustDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-custs/{id}")
    @Timed
    public ResponseEntity<OrderCustDTO> getOrderCust(@PathVariable Long id) {
        log.debug("REST request to get OrderCust : {}", id);
        Optional<OrderCustDTO> orderCustDTO = orderCustRepository.findById(id)
            .map(orderCustMapper::toDto);
        return ResponseUtil.wrapOrNotFound(orderCustDTO);
    }

    /**
     * DELETE  /order-custs/:id : delete the "id" orderCust.
     *
     * @param id the id of the orderCustDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-custs/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderCust(@PathVariable Long id) {
        log.debug("REST request to delete OrderCust : {}", id);

        orderCustRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
