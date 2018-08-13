package com.pigalon.lecopain.service.mapper;

import com.pigalon.lecopain.domain.*;
import com.pigalon.lecopain.service.dto.SubLineDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubLine and its DTO SubLineDTO.
 */
@Mapper(componentModel = "spring", uses = {SubscMapper.class, OrderCustMapper.class})
public interface SubLineMapper extends EntityMapper<SubLineDTO, SubLine> {

    @Mapping(source = "subsc.id", target = "subscId")
    @Mapping(source = "order.id", target = "orderId")
    SubLineDTO toDto(SubLine subLine);

    @Mapping(source = "subscId", target = "subsc")
    @Mapping(source = "orderId", target = "order")
    SubLine toEntity(SubLineDTO subLineDTO);

    default SubLine fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubLine subLine = new SubLine();
        subLine.setId(id);
        return subLine;
    }
}
