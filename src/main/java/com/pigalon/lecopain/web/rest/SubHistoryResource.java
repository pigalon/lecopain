package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.service.SubHistoryService;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.service.dto.SubHistoryDTO;
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
 * REST controller for managing SubHistory.
 */
@RestController
@RequestMapping("/api")
public class SubHistoryResource {

    private final Logger log = LoggerFactory.getLogger(SubHistoryResource.class);

    private static final String ENTITY_NAME = "subHistory";

    private final SubHistoryService subHistoryService;

    public SubHistoryResource(SubHistoryService subHistoryService) {
        this.subHistoryService = subHistoryService;
    }

    /**
     * POST  /sub-histories : Create a new subHistory.
     *
     * @param subHistoryDTO the subHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subHistoryDTO, or with status 400 (Bad Request) if the subHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-histories")
    @Timed
    public ResponseEntity<SubHistoryDTO> createSubHistory(@RequestBody SubHistoryDTO subHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save SubHistory : {}", subHistoryDTO);
        if (subHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new subHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubHistoryDTO result = subHistoryService.save(subHistoryDTO);
        return ResponseEntity.created(new URI("/api/sub-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-histories : Updates an existing subHistory.
     *
     * @param subHistoryDTO the subHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subHistoryDTO,
     * or with status 400 (Bad Request) if the subHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the subHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-histories")
    @Timed
    public ResponseEntity<SubHistoryDTO> updateSubHistory(@RequestBody SubHistoryDTO subHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update SubHistory : {}", subHistoryDTO);
        if (subHistoryDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubHistoryDTO result = subHistoryService.save(subHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-histories : get all the subHistories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subHistories in body
     */
    @GetMapping("/sub-histories")
    @Timed
    public List<SubHistoryDTO> getAllSubHistories() {
        log.debug("REST request to get all SubHistories");
        return subHistoryService.findAll();
    }

    /**
     * GET  /sub-histories/:id : get the "id" subHistory.
     *
     * @param id the id of the subHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sub-histories/{id}")
    @Timed
    public ResponseEntity<SubHistoryDTO> getSubHistory(@PathVariable Long id) {
        log.debug("REST request to get SubHistory : {}", id);
        Optional<SubHistoryDTO> subHistoryDTO = subHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subHistoryDTO);
    }

    /**
     * DELETE  /sub-histories/:id : delete the "id" subHistory.
     *
     * @param id the id of the subHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubHistory(@PathVariable Long id) {
        log.debug("REST request to delete SubHistory : {}", id);
        subHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
