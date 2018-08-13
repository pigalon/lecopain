package com.pigalon.lecopain.service;

import com.pigalon.lecopain.service.dto.SubLineDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SubLine.
 */
public interface SubLineService {

    /**
     * Save a subLine.
     *
     * @param subLineDTO the entity to save
     * @return the persisted entity
     */
    SubLineDTO save(SubLineDTO subLineDTO);

    /**
     * Get all the subLines.
     *
     * @return the list of entities
     */
    List<SubLineDTO> findAll();


    /**
     * Get the "id" subLine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SubLineDTO> findOne(Long id);

    /**
     * Delete the "id" subLine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
