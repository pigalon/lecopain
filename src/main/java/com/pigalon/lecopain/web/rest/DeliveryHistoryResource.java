package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.service.DeliveryHistoryService;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.service.dto.DeliveryHistoryDTO;
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
 * REST controller for managing DeliveryHistory.
 */
@RestController
@RequestMapping("/api")
public class DeliveryHistoryResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryHistoryResource.class);

    private static final String ENTITY_NAME = "deliveryHistory";

    private final DeliveryHistoryService deliveryHistoryService;

    public DeliveryHistoryResource(DeliveryHistoryService deliveryHistoryService) {
        this.deliveryHistoryService = deliveryHistoryService;
    }

    /**
     * POST  /delivery-histories : Create a new deliveryHistory.
     *
     * @param deliveryHistoryDTO the deliveryHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new deliveryHistoryDTO, or with status 400 (Bad Request) if the deliveryHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/delivery-histories")
    @Timed
    public ResponseEntity<DeliveryHistoryDTO> createDeliveryHistory(@RequestBody DeliveryHistoryDTO deliveryHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save DeliveryHistory : {}", deliveryHistoryDTO);
        if (deliveryHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new deliveryHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryHistoryDTO result = deliveryHistoryService.save(deliveryHistoryDTO);
        return ResponseEntity.created(new URI("/api/delivery-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /delivery-histories : Updates an existing deliveryHistory.
     *
     * @param deliveryHistoryDTO the deliveryHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated deliveryHistoryDTO,
     * or with status 400 (Bad Request) if the deliveryHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the deliveryHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/delivery-histories")
    @Timed
    public ResponseEntity<DeliveryHistoryDTO> updateDeliveryHistory(@RequestBody DeliveryHistoryDTO deliveryHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update DeliveryHistory : {}", deliveryHistoryDTO);
        if (deliveryHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DeliveryHistoryDTO result = deliveryHistoryService.save(deliveryHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, deliveryHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /delivery-histories : get all the deliveryHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of deliveryHistories in body
     */
    @GetMapping("/delivery-histories")
    @Timed
    public List<DeliveryHistoryDTO> getAllDeliveryHistories() {
        log.debug("REST request to get all DeliveryHistories");
        return deliveryHistoryService.findAll();
    }

    /**
     * GET  /delivery-histories/:id : get the "id" deliveryHistory.
     *
     * @param id the id of the deliveryHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the deliveryHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/delivery-histories/{id}")
    @Timed
    public ResponseEntity<DeliveryHistoryDTO> getDeliveryHistory(@PathVariable Long id) {
        log.debug("REST request to get DeliveryHistory : {}", id);
        Optional<DeliveryHistoryDTO> deliveryHistoryDTO = deliveryHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(deliveryHistoryDTO);
    }

    /**
     * DELETE  /delivery-histories/:id : delete the "id" deliveryHistory.
     *
     * @param id the id of the deliveryHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/delivery-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteDeliveryHistory(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryHistory : {}", id);
        deliveryHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
