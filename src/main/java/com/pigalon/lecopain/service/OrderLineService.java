package com.pigalon.lecopain.service;

import com.pigalon.lecopain.service.dto.OrderLineDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing OrderLine.
 */
public interface OrderLineService {

    /**
     * Save a orderLine.
     *
     * @param orderLineDTO the entity to save
     * @return the persisted entity
     */
    OrderLineDTO save(OrderLineDTO orderLineDTO);

    /**
     * Get all the orderLines.
     *
     * @return the list of entities
     */
    List<OrderLineDTO> findAll();


    /**
     * Get the "id" orderLine.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<OrderLineDTO> findOne(Long id);

    /**
     * Delete the "id" orderLine.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
