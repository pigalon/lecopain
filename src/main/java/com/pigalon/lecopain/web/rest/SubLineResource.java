package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.service.SubLineService;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.service.dto.SubLineDTO;
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
 * REST controller for managing SubLine.
 */
@RestController
@RequestMapping("/api")
public class SubLineResource {

    private final Logger log = LoggerFactory.getLogger(SubLineResource.class);

    private static final String ENTITY_NAME = "subLine";

    private final SubLineService subLineService;

    public SubLineResource(SubLineService subLineService) {
        this.subLineService = subLineService;
    }

    /**
     * POST  /sub-lines : Create a new subLine.
     *
     * @param subLineDTO the subLineDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subLineDTO, or with status 400 (Bad Request) if the subLine has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-lines")
    @Timed
    public ResponseEntity<SubLineDTO> createSubLine(@RequestBody SubLineDTO subLineDTO) throws URISyntaxException {
        log.debug("REST request to save SubLine : {}", subLineDTO);
        if (subLineDTO.getId() != null) {
            throw new BadRequestAlertException("A new subLine cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubLineDTO result = subLineService.save(subLineDTO);
        return ResponseEntity.created(new URI("/api/sub-lines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-lines : Updates an existing subLine.
     *
     * @param subLineDTO the subLineDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subLineDTO,
     * or with status 400 (Bad Request) if the subLineDTO is not valid,
     * or with status 500 (Internal Server Error) if the subLineDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-lines")
    @Timed
    public ResponseEntity<SubLineDTO> updateSubLine(@RequestBody SubLineDTO subLineDTO) throws URISyntaxException {
        log.debug("REST request to update SubLine : {}", subLineDTO);
        if (subLineDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubLineDTO result = subLineService.save(subLineDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subLineDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-lines : get all the subLines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subLines in body
     */
    @GetMapping("/sub-lines")
    @Timed
    public List<SubLineDTO> getAllSubLines() {
        log.debug("REST request to get all SubLines");
        return subLineService.findAll();
    }

    /**
     * GET  /sub-lines/:id : get the "id" subLine.
     *
     * @param id the id of the subLineDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subLineDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sub-lines/{id}")
    @Timed
    public ResponseEntity<SubLineDTO> getSubLine(@PathVariable Long id) {
        log.debug("REST request to get SubLine : {}", id);
        Optional<SubLineDTO> subLineDTO = subLineService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subLineDTO);
    }

    /**
     * DELETE  /sub-lines/:id : delete the "id" subLine.
     *
     * @param id the id of the subLineDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-lines/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubLine(@PathVariable Long id) {
        log.debug("REST request to delete SubLine : {}", id);
        subLineService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
