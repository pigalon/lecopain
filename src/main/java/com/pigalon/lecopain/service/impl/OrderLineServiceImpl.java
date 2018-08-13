package com.pigalon.lecopain.service.impl;

import com.pigalon.lecopain.service.OrderLineService;
import com.pigalon.lecopain.domain.OrderLine;
import com.pigalon.lecopain.repository.OrderLineRepository;
import com.pigalon.lecopain.service.dto.OrderLineDTO;
import com.pigalon.lecopain.service.mapper.OrderLineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing OrderLine.
 */
@Service
@Transactional
public class OrderLineServiceImpl implements OrderLineService {

    private final Logger log = LoggerFactory.getLogger(OrderLineServiceImpl.class);

    private final OrderLineRepository orderLineRepository;

    private final OrderLineMapper orderLineMapper;

    public OrderLineServiceImpl(OrderLineRepository orderLineRepository, OrderLineMapper orderLineMapper) {
        this.orderLineRepository = orderLineRepository;
        this.orderLineMapper = orderLineMapper;
    }

    /**
     * Save a orderLine.
     *
     * @param orderLineDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrderLineDTO save(OrderLineDTO orderLineDTO) {
        log.debug("Request to save OrderLine : {}", orderLineDTO);
        OrderLine orderLine = orderLineMapper.toEntity(orderLineDTO);
        orderLine = orderLineRepository.save(orderLine);
        return orderLineMapper.toDto(orderLine);
    }

    /**
     * Get all the orderLines.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<OrderLineDTO> findAll() {
        log.debug("Request to get all OrderLines");
        return orderLineRepository.findAll().stream()
            .map(orderLineMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one orderLine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<OrderLineDTO> findOne(Long id) {
        log.debug("Request to get OrderLine : {}", id);
        return orderLineRepository.findById(id)
            .map(orderLineMapper::toDto);
    }

    /**
     * Delete the orderLine by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderLine : {}", id);
        orderLineRepository.deleteById(id);
    }
}
