package com.pigalon.lecopain.service.impl;

import com.pigalon.lecopain.service.SubHistoryService;
import com.pigalon.lecopain.domain.SubHistory;
import com.pigalon.lecopain.repository.SubHistoryRepository;
import com.pigalon.lecopain.service.dto.SubHistoryDTO;
import com.pigalon.lecopain.service.mapper.SubHistoryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing SubHistory.
 */
@Service
@Transactional
public class SubHistoryServiceImpl implements SubHistoryService {

    private final Logger log = LoggerFactory.getLogger(SubHistoryServiceImpl.class);

    private final SubHistoryRepository subHistoryRepository;

    private final SubHistoryMapper subHistoryMapper;

    public SubHistoryServiceImpl(SubHistoryRepository subHistoryRepository, SubHistoryMapper subHistoryMapper) {
        this.subHistoryRepository = subHistoryRepository;
        this.subHistoryMapper = subHistoryMapper;
    }

    /**
     * Save a subHistory.
     *
     * @param subHistoryDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubHistoryDTO save(SubHistoryDTO subHistoryDTO) {
        log.debug("Request to save SubHistory : {}", subHistoryDTO);
        SubHistory subHistory = subHistoryMapper.toEntity(subHistoryDTO);
        subHistory = subHistoryRepository.save(subHistory);
        return subHistoryMapper.toDto(subHistory);
    }

    /**
     * Get all the subHistories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SubHistoryDTO> findAll() {
        log.debug("Request to get all SubHistories");
        return subHistoryRepository.findAll().stream()
            .map(subHistoryMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one subHistory by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubHistoryDTO> findOne(Long id) {
        log.debug("Request to get SubHistory : {}", id);
        return subHistoryRepository.findById(id)
            .map(subHistoryMapper::toDto);
    }

    /**
     * Delete the subHistory by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubHistory : {}", id);
        subHistoryRepository.deleteById(id);
    }
}
