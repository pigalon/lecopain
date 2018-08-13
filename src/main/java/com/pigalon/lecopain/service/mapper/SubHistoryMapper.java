package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.SubHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubHistory and its DTO SubHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {SubscMapper.class})
public interface SubHistoryMapper extends EntityMapper<SubHistoryDTO, SubHistory> {

    @Mapping(source = "subscription.id", target = "subscriptionId")
    SubHistoryDTO toDto(SubHistory subHistory);

    @Mapping(source = "subscriptionId", target = "subscription")
    SubHistory toEntity(SubHistoryDTO subHistoryDTO);

    default SubHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubHistory subHistory = new SubHistory();
        subHistory.setId(id);
        return subHistory;
    }
}
