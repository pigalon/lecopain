package com.pigalon.lecopain.service.impl;

import com.pigalon.lecopain.service.DeliveryHistoryService;
import com.pigalon.lecopain.domain.DeliveryHistory;
import com.pigalon.lecopain.repository.DeliveryHistoryRepository;
import com.pigalon.lecopain.service.dto.DeliveryHistoryDTO;
import com.pigalon.lecopain.service.mapper.DeliveryHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing DeliveryHistory.
 */
@Service
@Transactional
public class DeliveryHistoryServiceImpl implements DeliveryHistoryService {

    private final Logger log = LoggerFactory.getLogger(DeliveryHistoryServiceImpl.class);

    private final DeliveryHistoryRepository deliveryHistoryRepository;

    private final DeliveryHistoryMapper deliveryHistoryMapper;

    public DeliveryHistoryServiceImpl(DeliveryHistoryRepository deliveryHistoryRepository, DeliveryHistoryMapper deliveryHistoryMapper) {
        this.deliveryHistoryRepository = deliveryHistoryRepository;
        this.deliveryHistoryMapper = deliveryHistoryMapper;
    }

    /**
     * Save a deliveryHistory.
     *
     * @param deliveryHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public DeliveryHistoryDTO save(DeliveryHistoryDTO deliveryHistoryDTO) {
        log.debug("Request to save DeliveryHistory : {}", deliveryHistoryDTO);
        DeliveryHistory deliveryHistory = deliveryHistoryMapper.toEntity(deliveryHistoryDTO);
        deliveryHistory = deliveryHistoryRepository.save(deliveryHistory);
        return deliveryHistoryMapper.toDto(deliveryHistory);
    }

    /**
     * Get all the deliveryHistories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DeliveryHistoryDTO> findAll() {
        log.debug("Request to get all DeliveryHistories");
        return deliveryHistoryRepository.findAll().stream()
            .map(deliveryHistoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one deliveryHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DeliveryHistoryDTO> findOne(Long id) {
        log.debug("Request to get DeliveryHistory : {}", id);
        return deliveryHistoryRepository.findById(id)
            .map(deliveryHistoryMapper::toDto);
    }

    /**
     * Delete the deliveryHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DeliveryHistory : {}", id);
        deliveryHistoryRepository.deleteById(id);
    }
}
