package com.pigalon.lecopain.service.impl;

import com.pigalon.lecopain.service.SubLineService;
import com.pigalon.lecopain.domain.SubLine;
import com.pigalon.lecopain.repository.SubLineRepository;
import com.pigalon.lecopain.service.dto.SubLineDTO;
import com.pigalon.lecopain.service.mapper.SubLineMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing SubLine.
 */
@Service
@Transactional
public class SubLineServiceImpl implements SubLineService {

    private final Logger log = LoggerFactory.getLogger(SubLineServiceImpl.class);

    private final SubLineRepository subLineRepository;

    private final SubLineMapper subLineMapper;

    public SubLineServiceImpl(SubLineRepository subLineRepository, SubLineMapper subLineMapper) {
        this.subLineRepository = subLineRepository;
        this.subLineMapper = subLineMapper;
    }

    /**
     * Save a subLine.
     *
     * @param subLineDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubLineDTO save(SubLineDTO subLineDTO) {
        log.debug("Request to save SubLine : {}", subLineDTO);
        SubLine subLine = subLineMapper.toEntity(subLineDTO);
        subLine = subLineRepository.save(subLine);
        return subLineMapper.toDto(subLine);
    }

    /**
     * Get all the subLines.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SubLineDTO> findAll() {
        log.debug("Request to get all SubLines");
        return subLineRepository.findAll().stream()
            .map(subLineMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one subLine by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubLineDTO> findOne(Long id) {
        log.debug("Request to get SubLine : {}", id);
        return subLineRepository.findById(id)
            .map(subLineMapper::toDto);
    }

    /**
     * Delete the subLine by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubLine : {}", id);
        subLineRepository.deleteById(id);
    }
}
