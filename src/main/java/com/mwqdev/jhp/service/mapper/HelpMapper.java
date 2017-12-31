package com.mwqdev.jhp.service.mapper;

import com.mwqdev.jhp.domain.*;
import com.mwqdev.jhp.service.dto.HelpDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Help and its DTO HelpDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HelpMapper extends EntityMapper<HelpDTO, Help> {

    

    

    default Help fromId(Long id) {
        if (id == null) {
            return null;
        }
        Help help = new Help();
        help.setId(id);
        return help;
    }
}
