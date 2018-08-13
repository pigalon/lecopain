package com.pigalon.lecopain.service;

import com.pigalon.lecopain.service.dto.ProductHistoryDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing ProductHistory.
 */
public interface ProductHistoryService {

    /**
     * Save a productHistory.
     *
     * @param productHistoryDTO the entity to save
     * @return the persisted entity
     */
    ProductHistoryDTO save(ProductHistoryDTO productHistoryDTO);

    /**
     * Get all the productHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProductHistoryDTO> findAll(Pageable pageable);


    /**
     * Get the "id" productHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ProductHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" productHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
