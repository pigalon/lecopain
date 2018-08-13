package com.pigalon.lecopain.service.impl;

import com.pigalon.lecopain.service.ProductHistoryService;
import com.pigalon.lecopain.domain.ProductHistory;
import com.pigalon.lecopain.repository.ProductHistoryRepository;
import com.pigalon.lecopain.service.dto.ProductHistoryDTO;
import com.pigalon.lecopain.service.mapper.ProductHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing ProductHistory.
 */
@Service
@Transactional
public class ProductHistoryServiceImpl implements ProductHistoryService {

    private final Logger log = LoggerFactory.getLogger(ProductHistoryServiceImpl.class);

    private final ProductHistoryRepository productHistoryRepository;

    private final ProductHistoryMapper productHistoryMapper;

    public ProductHistoryServiceImpl(ProductHistoryRepository productHistoryRepository, ProductHistoryMapper productHistoryMapper) {
        this.productHistoryRepository = productHistoryRepository;
        this.productHistoryMapper = productHistoryMapper;
    }

    /**
     * Save a productHistory.
     *
     * @param productHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductHistoryDTO save(ProductHistoryDTO productHistoryDTO) {
        log.debug("Request to save ProductHistory : {}", productHistoryDTO);
        ProductHistory productHistory = productHistoryMapper.toEntity(productHistoryDTO);
        productHistory = productHistoryRepository.save(productHistory);
        return productHistoryMapper.toDto(productHistory);
    }

    /**
     * Get all the productHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductHistoryDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProductHistories");
        return productHistoryRepository.findAll(pageable)
            .map(productHistoryMapper::toDto);
    }


    /**
     * Get one productHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductHistoryDTO> findOne(Long id) {
        log.debug("Request to get ProductHistory : {}", id);
        return productHistoryRepository.findById(id)
            .map(productHistoryMapper::toDto);
    }

    /**
     * Delete the productHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductHistory : {}", id);
        productHistoryRepository.deleteById(id);
    }
}
