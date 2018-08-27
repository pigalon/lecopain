package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.domain.OrderMain;
import com.pigalon.lecopain.repository.OrderMainRepository;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.web.rest.util.PaginationUtil;
import com.pigalon.lecopain.service.dto.OrderMainDTO;
import com.pigalon.lecopain.service.mapper.OrderMainMapper;
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
 * REST controller for managing OrderMain.
 */
@RestController
@RequestMapping("/api")
public class OrderMainResource {

    private final Logger log = LoggerFactory.getLogger(OrderMainResource.class);

    private static final String ENTITY_NAME = "orderMain";

    private final OrderMainRepository orderMainRepository;

    private final OrderMainMapper orderMainMapper;

    public OrderMainResource(OrderMainRepository orderMainRepository, OrderMainMapper orderMainMapper) {
        this.orderMainRepository = orderMainRepository;
        this.orderMainMapper = orderMainMapper;
    }

    /**
     * POST  /order-mains : Create a new orderMain.
     *
     * @param orderMainDTO the orderMainDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new orderMainDTO, or with status 400 (Bad Request) if the orderMain has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/order-mains")
    @Timed
    public ResponseEntity<OrderMainDTO> createOrderMain(@RequestBody OrderMainDTO orderMainDTO) throws URISyntaxException {
        log.debug("REST request to save OrderMain : {}", orderMainDTO);
        if (orderMainDTO.getId() != null) {
            throw new BadRequestAlertException("A new orderMain cannot already have an ID", ENTITY_NAME, "idexists");
        }

        OrderMain orderMain = orderMainMapper.toEntity(orderMainDTO);
        orderMain = orderMainRepository.save(orderMain);
        OrderMainDTO result = orderMainMapper.toDto(orderMain);
        return ResponseEntity.created(new URI("/api/order-mains/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /order-mains : Updates an existing orderMain.
     *
     * @param orderMainDTO the orderMainDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated orderMainDTO,
     * or with status 400 (Bad Request) if the orderMainDTO is not valid,
     * or with status 500 (Internal Server Error) if the orderMainDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/order-mains")
    @Timed
    public ResponseEntity<OrderMainDTO> updateOrderMain(@RequestBody OrderMainDTO orderMainDTO) throws URISyntaxException {
        log.debug("REST request to update OrderMain : {}", orderMainDTO);
        if (orderMainDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }

        OrderMain orderMain = orderMainMapper.toEntity(orderMainDTO);
        orderMain = orderMainRepository.save(orderMain);
        OrderMainDTO result = orderMainMapper.toDto(orderMain);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, orderMainDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /order-mains : get all the orderMains.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of orderMains in body
     */
    @GetMapping("/order-mains")
    @Timed
    public ResponseEntity<List<OrderMainDTO>> getAllOrderMains(Pageable pageable) {
        log.debug("REST request to get a page of OrderMains");
        Page<OrderMainDTO> page = orderMainRepository.findAll(pageable).map(orderMainMapper::toDto);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/order-mains");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /order-mains/:id : get the "id" orderMain.
     *
     * @param id the id of the orderMainDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the orderMainDTO, or with status 404 (Not Found)
     */
    @GetMapping("/order-mains/{id}")
    @Timed
    public ResponseEntity<OrderMainDTO> getOrderMain(@PathVariable Long id) {
        log.debug("REST request to get OrderMain : {}", id);
        Optional<OrderMainDTO> orderMainDTO = orderMainRepository.findById(id)
            .map(orderMainMapper::toDto);
        return ResponseUtil.wrapOrNotFound(orderMainDTO);
    }

    /**
     * DELETE  /order-mains/:id : delete the "id" orderMain.
     *
     * @param id the id of the orderMainDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/order-mains/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrderMain(@PathVariable Long id) {
        log.debug("REST request to delete OrderMain : {}", id);

        orderMainRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
