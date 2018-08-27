package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.SubLine;
import com.pigalon.lecopain.repository.SubLineRepository;
import com.pigalon.lecopain.service.SubLineService;
import com.pigalon.lecopain.service.dto.SubLineDTO;
import com.pigalon.lecopain.service.mapper.SubLineMapper;
import com.pigalon.lecopain.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.pigalon.lecopain.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SubLineResource REST controller.
 *
 * @see SubLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class SubLineResourceIntTest {

    private static final String DEFAULT_S_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_S_REFERENCE = "BBBBBBBBBB";

    @Autowired
    private SubLineRepository subLineRepository;


    @Autowired
    private SubLineMapper subLineMapper;
    

    @Autowired
    private SubLineService subLineService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubLineMockMvc;

    private SubLine subLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubLineResource subLineResource = new SubLineResource(subLineService);
        this.restSubLineMockMvc = MockMvcBuilders.standaloneSetup(subLineResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubLine createEntity(EntityManager em) {
        SubLine subLine = new SubLine()
            .sReference(DEFAULT_S_REFERENCE);
        return subLine;
    }

    @Before
    public void initTest() {
        subLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubLine() throws Exception {
        int databaseSizeBeforeCreate = subLineRepository.findAll().size();

        // Create the SubLine
        SubLineDTO subLineDTO = subLineMapper.toDto(subLine);
        restSubLineMockMvc.perform(post("/api/sub-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subLineDTO)))
            .andExpect(status().isCreated());

        // Validate the SubLine in the database
        List<SubLine> subLineList = subLineRepository.findAll();
        assertThat(subLineList).hasSize(databaseSizeBeforeCreate + 1);
        SubLine testSubLine = subLineList.get(subLineList.size() - 1);
        assertThat(testSubLine.getsReference()).isEqualTo(DEFAULT_S_REFERENCE);
    }

    @Test
    @Transactional
    public void createSubLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subLineRepository.findAll().size();

        // Create the SubLine with an existing ID
        subLine.setId(1L);
        SubLineDTO subLineDTO = subLineMapper.toDto(subLine);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubLineMockMvc.perform(post("/api/sub-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubLine in the database
        List<SubLine> subLineList = subLineRepository.findAll();
        assertThat(subLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubLines() throws Exception {
        // Initialize the database
        subLineRepository.saveAndFlush(subLine);

        // Get all the subLineList
        restSubLineMockMvc.perform(get("/api/sub-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].sReference").value(hasItem(DEFAULT_S_REFERENCE.toString())));
    }
    

    @Test
    @Transactional
    public void getSubLine() throws Exception {
        // Initialize the database
        subLineRepository.saveAndFlush(subLine);

        // Get the subLine
        restSubLineMockMvc.perform(get("/api/sub-lines/{id}", subLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subLine.getId().intValue()))
            .andExpect(jsonPath("$.sReference").value(DEFAULT_S_REFERENCE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSubLine() throws Exception {
        // Get the subLine
        restSubLineMockMvc.perform(get("/api/sub-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubLine() throws Exception {
        // Initialize the database
        subLineRepository.saveAndFlush(subLine);

        int databaseSizeBeforeUpdate = subLineRepository.findAll().size();

        // Update the subLine
        SubLine updatedSubLine = subLineRepository.findById(subLine.getId()).get();
        // Disconnect from session so that the updates on updatedSubLine are not directly saved in db
        em.detach(updatedSubLine);
        updatedSubLine
            .sReference(UPDATED_S_REFERENCE);
        SubLineDTO subLineDTO = subLineMapper.toDto(updatedSubLine);

        restSubLineMockMvc.perform(put("/api/sub-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subLineDTO)))
            .andExpect(status().isOk());

        // Validate the SubLine in the database
        List<SubLine> subLineList = subLineRepository.findAll();
        assertThat(subLineList).hasSize(databaseSizeBeforeUpdate);
        SubLine testSubLine = subLineList.get(subLineList.size() - 1);
        assertThat(testSubLine.getsReference()).isEqualTo(UPDATED_S_REFERENCE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubLine() throws Exception {
        int databaseSizeBeforeUpdate = subLineRepository.findAll().size();

        // Create the SubLine
        SubLineDTO subLineDTO = subLineMapper.toDto(subLine);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restSubLineMockMvc.perform(put("/api/sub-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubLine in the database
        List<SubLine> subLineList = subLineRepository.findAll();
        assertThat(subLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubLine() throws Exception {
        // Initialize the database
        subLineRepository.saveAndFlush(subLine);

        int databaseSizeBeforeDelete = subLineRepository.findAll().size();

        // Get the subLine
        restSubLineMockMvc.perform(delete("/api/sub-lines/{id}", subLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubLine> subLineList = subLineRepository.findAll();
        assertThat(subLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubLine.class);
        SubLine subLine1 = new SubLine();
        subLine1.setId(1L);
        SubLine subLine2 = new SubLine();
        subLine2.setId(subLine1.getId());
        assertThat(subLine1).isEqualTo(subLine2);
        subLine2.setId(2L);
        assertThat(subLine1).isNotEqualTo(subLine2);
        subLine1.setId(null);
        assertThat(subLine1).isNotEqualTo(subLine2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubLineDTO.class);
        SubLineDTO subLineDTO1 = new SubLineDTO();
        subLineDTO1.setId(1L);
        SubLineDTO subLineDTO2 = new SubLineDTO();
        assertThat(subLineDTO1).isNotEqualTo(subLineDTO2);
        subLineDTO2.setId(subLineDTO1.getId());
        assertThat(subLineDTO1).isEqualTo(subLineDTO2);
        subLineDTO2.setId(2L);
        assertThat(subLineDTO1).isNotEqualTo(subLineDTO2);
        subLineDTO1.setId(null);
        assertThat(subLineDTO1).isNotEqualTo(subLineDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subLineMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subLineMapper.fromId(null)).isNull();
    }
}
