package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.service.SubscService;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.web.rest.util.PaginationUtil;
import com.pigalon.lecopain.service.dto.SubscDTO;
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
 * REST controller for managing Subsc.
 */
@RestController
@RequestMapping("/api")
public class SubscResource {

    private final Logger log = LoggerFactory.getLogger(SubscResource.class);

    private static final String ENTITY_NAME = "subsc";

    private final SubscService subscService;

    public SubscResource(SubscService subscService) {
        this.subscService = subscService;
    }

    /**
     * POST  /subscs : Create a new subsc.
     *
     * @param subscDTO the subscDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subscDTO, or with status 400 (Bad Request) if the subsc has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/subscs")
    @Timed
    public ResponseEntity<SubscDTO> createSubsc(@RequestBody SubscDTO subscDTO) throws URISyntaxException {
        log.debug("REST request to save Subsc : {}", subscDTO);
        if (subscDTO.getId() != null) {
            throw new BadRequestAlertException("A new subsc cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubscDTO result = subscService.save(subscDTO);
        return ResponseEntity.created(new URI("/api/subscs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subscs : Updates an existing subsc.
     *
     * @param subscDTO the subscDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subscDTO,
     * or with status 400 (Bad Request) if the subscDTO is not valid,
     * or with status 500 (Internal Server Error) if the subscDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/subscs")
    @Timed
    public ResponseEntity<SubscDTO> updateSubsc(@RequestBody SubscDTO subscDTO) throws URISyntaxException {
        log.debug("REST request to update Subsc : {}", subscDTO);
        if (subscDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubscDTO result = subscService.save(subscDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subscDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subscs : get all the subscs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of subscs in body
     */
    @GetMapping("/subscs")
    @Timed
    public ResponseEntity<List<SubscDTO>> getAllSubscs(Pageable pageable) {
        log.debug("REST request to get a page of Subscs");
        Page<SubscDTO> page = subscService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/subscs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /subscs/:id : get the "id" subsc.
     *
     * @param id the id of the subscDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subscDTO, or with status 404 (Not Found)
     */
    @GetMapping("/subscs/{id}")
    @Timed
    public ResponseEntity<SubscDTO> getSubsc(@PathVariable Long id) {
        log.debug("REST request to get Subsc : {}", id);
        Optional<SubscDTO> subscDTO = subscService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subscDTO);
    }

    /**
     * DELETE  /subscs/:id : delete the "id" subsc.
     *
     * @param id the id of the subscDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/subscs/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubsc(@PathVariable Long id) {
        log.debug("REST request to delete Subsc : {}", id);
        subscService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
