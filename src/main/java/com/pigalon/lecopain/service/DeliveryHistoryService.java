package com.pigalon.lecopain.service;

import com.pigalon.lecopain.service.dto.DeliveryHistoryDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing DeliveryHistory.
 */
public interface DeliveryHistoryService {

    /**
     * Save a deliveryHistory.
     *
     * @param deliveryHistoryDTO the entity to save
     * @return the persisted entity
     */
    DeliveryHistoryDTO save(DeliveryHistoryDTO deliveryHistoryDTO);

    /**
     * Get all the deliveryHistories.
     *
     * @return the list of entities
     */
    List<DeliveryHistoryDTO> findAll();


    /**
     * Get the "id" deliveryHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DeliveryHistoryDTO> findOne(Long id);

    /**
     * Delete the "id" deliveryHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
