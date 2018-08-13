package com.pigalon.lecopain.service;

import com.pigalon.lecopain.service.dto.SubscDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Subsc.
 */
public interface SubscService {

    /**
     * Save a subsc.
     *
     * @param subscDTO the entity to save
     * @return the persisted entity
     */
    SubscDTO save(SubscDTO subscDTO);

    /**
     * Get all the subscs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SubscDTO> findAll(Pageable pageable);


    /**
     * Get the "id" subsc.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SubscDTO> findOne(Long id);

    /**
     * Delete the "id" subsc.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
