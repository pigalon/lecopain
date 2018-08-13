package com.pigalon.lecopain.service;

import com.pigalon.lecopain.service.dto.SubHistoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing SubHistory.
 */
public interface SubHistoryService {

    /**
     * Save a subHistory.
     *
     * @param subHistoryDTO the entity to save
     * @return the persisted entity
     */
    SubHistoryDTO save(SubHistoryDTO subHistoryDTO);

    /**
     * Get all the subHistories.
     *
     * @return the list of entities
     */
    List<SubHistoryDTO> findAll();


    /**
     * Get the "id" subHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SubHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" subHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
