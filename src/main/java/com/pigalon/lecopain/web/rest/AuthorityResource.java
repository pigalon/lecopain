package com.pigalon.lecopain.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.pigalon.lecopain.repository.AuthorityRepository;
import com.pigalon.lecopain.web.rest.errors.BadRequestAlertException;
import com.pigalon.lecopain.web.rest.util.HeaderUtil;
import com.pigalon.lecopain.web.rest.util.PaginationUtil;
import com.pigalon.lecopain.domain.Authority;
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
 * REST controller for managing Authority.
 */
@RestController
@RequestMapping("/api")
public class AuthorityResource {

    private final Logger log = LoggerFactory.getLogger(AuthorityResource.class);

    private static final String ENTITY_NAME = "authority";

    private final AuthorityRepository authorityRepository;

    public AuthorityResource(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    /**
     * POST  /authorities : Create a new product.
     *
     * @param Authority the productDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productDTO, or with status 400 (Bad Request) if the product has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/authorities")
    @Timed
    public ResponseEntity<Authority> createAuthority(@RequestBody Authority authority) throws URISyntaxException {
        log.debug("REST request to save authority : {}", authority);
        if (authority.getName() != null) {
            throw new BadRequestAlertException("A new authority cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Authority result = authorityRepository.save(authority);
        return ResponseEntity.created(new URI("/api/authorities/" + result.getName()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getName().toString()))
            .body(result);
    }

    /**
     * PUT  /authorities : Updates an existing authority.
     *
     * @param Authority
     * @return the ResponseEntity with status 200 (OK) and with body the updated productDTO,
     * or with status 400 (Bad Request) if the productDTO is not valid,
     * or with status 500 (Internal Server Error) if the productDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/authorities")
    @Timed
    public ResponseEntity<Authority> updateProduct(@RequestBody Authority authority) throws URISyntaxException {
        log.debug("REST request to update Product : {}", authority);
        if (authority.getName() == null) {
            throw new BadRequestAlertException("Invalid name", ENTITY_NAME, "namenull");
        }
        Authority result = authorityRepository.save(authority);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, authority.getName().toString()))
            .body(result);
    }

    /**
     * GET  /authorities : get all the authorities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     */

    @GetMapping("/authorities")
    @Timed
    public ResponseEntity<List<Authority>> getAllAuthorities(Pageable pageable) {
        log.debug("REST request to get all Authorities");
        Page<Authority> page = authorityRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/authorities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
        //return authorityRepository.findAll();
    }

    /**
     * GET  /authorities/:name : get the "id" product.
     *
     * @param name the id of the productDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productDTO, or with status 404 (Not Found)
     */
    @GetMapping("/authorities/{name}")
    @Timed
    public ResponseEntity<Authority> getProduct(@PathVariable String name) {
        log.debug("REST request to get Product : {}", name);
        Optional<Authority> authority = authorityRepository.findByName(name);
        return ResponseUtil.wrapOrNotFound(authority);
    }

    /**
     * DELETE  /authorities/:name : delete the "name" authority.
     *
     * @param name 
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/authorities/{name}")
    @Timed
    public ResponseEntity<Void> deleteProduct(@PathVariable String name) {
        log.debug("REST request to delete Authority : {}", name);
        authorityRepository.deleteByName(name);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, name.toString())).build();
    }
}
