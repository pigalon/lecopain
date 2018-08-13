package com.pigalon.lecopain.service.impl;

import com.pigalon.lecopain.service.SubscService;
import com.pigalon.lecopain.domain.Subsc;
import com.pigalon.lecopain.repository.SubscRepository;
import com.pigalon.lecopain.service.dto.SubscDTO;
import com.pigalon.lecopain.service.mapper.SubscMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Subsc.
 */
@Service
@Transactional
public class SubscServiceImpl implements SubscService {

    private final Logger log = LoggerFactory.getLogger(SubscServiceImpl.class);

    private final SubscRepository subscRepository;

    private final SubscMapper subscMapper;

    public SubscServiceImpl(SubscRepository subscRepository, SubscMapper subscMapper) {
        this.subscRepository = subscRepository;
        this.subscMapper = subscMapper;
    }

    /**
     * Save a subsc.
     *
     * @param subscDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubscDTO save(SubscDTO subscDTO) {
        log.debug("Request to save Subsc : {}", subscDTO);
        Subsc subsc = subscMapper.toEntity(subscDTO);
        subsc = subscRepository.save(subsc);
        return subscMapper.toDto(subsc);
    }

    /**
     * Get all the subscs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SubscDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Subscs");
        return subscRepository.findAll(pageable)
            .map(subscMapper::toDto);
    }


    /**
     * Get one subsc by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubscDTO> findOne(Long id) {
        log.debug("Request to get Subsc : {}", id);
        return subscRepository.findById(id)
            .map(subscMapper::toDto);
    }

    /**
     * Delete the subsc by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Subsc : {}", id);
        subscRepository.deleteById(id);
    }
}
