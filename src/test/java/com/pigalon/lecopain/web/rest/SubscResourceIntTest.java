package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.Subsc;
import com.pigalon.lecopain.repository.SubscRepository;
import com.pigalon.lecopain.service.SubscService;
import com.pigalon.lecopain.service.dto.SubscDTO;
import com.pigalon.lecopain.service.mapper.SubscMapper;
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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.pigalon.lecopain.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.pigalon.lecopain.domain.enumeration.SubType;
import com.pigalon.lecopain.domain.enumeration.SubscState;
/**
 * Test class for the SubscResource REST controller.
 *
 * @see SubscResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class SubscResourceIntTest {

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final SubType DEFAULT_TYPE = SubType.SUB1;
    private static final SubType UPDATED_TYPE = SubType.SUB2;

    private static final SubscState DEFAULT_STATUS = SubscState.PAID;
    private static final SubscState UPDATED_STATUS = SubscState.CREATED;

    @Autowired
    private SubscRepository subscRepository;


    @Autowired
    private SubscMapper subscMapper;
    

    @Autowired
    private SubscService subscService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubscMockMvc;

    private Subsc subsc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubscResource subscResource = new SubscResource(subscService);
        this.restSubscMockMvc = MockMvcBuilders.standaloneSetup(subscResource)
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
    public static Subsc createEntity(EntityManager em) {
        Subsc subsc = new Subsc()
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .type(DEFAULT_TYPE)
            .status(DEFAULT_STATUS);
        return subsc;
    }

    @Before
    public void initTest() {
        subsc = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubsc() throws Exception {
        int databaseSizeBeforeCreate = subscRepository.findAll().size();

        // Create the Subsc
        SubscDTO subscDTO = subscMapper.toDto(subsc);
        restSubscMockMvc.perform(post("/api/subscs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscDTO)))
            .andExpect(status().isCreated());

        // Validate the Subsc in the database
        List<Subsc> subscList = subscRepository.findAll();
        assertThat(subscList).hasSize(databaseSizeBeforeCreate + 1);
        Subsc testSubsc = subscList.get(subscList.size() - 1);
        assertThat(testSubsc.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testSubsc.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testSubsc.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testSubsc.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createSubscWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subscRepository.findAll().size();

        // Create the Subsc with an existing ID
        subsc.setId(1L);
        SubscDTO subscDTO = subscMapper.toDto(subsc);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubscMockMvc.perform(post("/api/subscs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subsc in the database
        List<Subsc> subscList = subscRepository.findAll();
        assertThat(subscList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubscs() throws Exception {
        // Initialize the database
        subscRepository.saveAndFlush(subsc);

        // Get all the subscList
        restSubscMockMvc.perform(get("/api/subscs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subsc.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getSubsc() throws Exception {
        // Initialize the database
        subscRepository.saveAndFlush(subsc);

        // Get the subsc
        restSubscMockMvc.perform(get("/api/subscs/{id}", subsc.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subsc.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSubsc() throws Exception {
        // Get the subsc
        restSubscMockMvc.perform(get("/api/subscs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubsc() throws Exception {
        // Initialize the database
        subscRepository.saveAndFlush(subsc);

        int databaseSizeBeforeUpdate = subscRepository.findAll().size();

        // Update the subsc
        Subsc updatedSubsc = subscRepository.findById(subsc.getId()).get();
        // Disconnect from session so that the updates on updatedSubsc are not directly saved in db
        em.detach(updatedSubsc);
        updatedSubsc
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .type(UPDATED_TYPE)
            .status(UPDATED_STATUS);
        SubscDTO subscDTO = subscMapper.toDto(updatedSubsc);

        restSubscMockMvc.perform(put("/api/subscs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscDTO)))
            .andExpect(status().isOk());

        // Validate the Subsc in the database
        List<Subsc> subscList = subscRepository.findAll();
        assertThat(subscList).hasSize(databaseSizeBeforeUpdate);
        Subsc testSubsc = subscList.get(subscList.size() - 1);
        assertThat(testSubsc.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testSubsc.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testSubsc.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testSubsc.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingSubsc() throws Exception {
        int databaseSizeBeforeUpdate = subscRepository.findAll().size();

        // Create the Subsc
        SubscDTO subscDTO = subscMapper.toDto(subsc);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubscMockMvc.perform(put("/api/subscs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subscDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Subsc in the database
        List<Subsc> subscList = subscRepository.findAll();
        assertThat(subscList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubsc() throws Exception {
        // Initialize the database
        subscRepository.saveAndFlush(subsc);

        int databaseSizeBeforeDelete = subscRepository.findAll().size();

        // Get the subsc
        restSubscMockMvc.perform(delete("/api/subscs/{id}", subsc.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Subsc> subscList = subscRepository.findAll();
        assertThat(subscList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Subsc.class);
        Subsc subsc1 = new Subsc();
        subsc1.setId(1L);
        Subsc subsc2 = new Subsc();
        subsc2.setId(subsc1.getId());
        assertThat(subsc1).isEqualTo(subsc2);
        subsc2.setId(2L);
        assertThat(subsc1).isNotEqualTo(subsc2);
        subsc1.setId(null);
        assertThat(subsc1).isNotEqualTo(subsc2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubscDTO.class);
        SubscDTO subscDTO1 = new SubscDTO();
        subscDTO1.setId(1L);
        SubscDTO subscDTO2 = new SubscDTO();
        assertThat(subscDTO1).isNotEqualTo(subscDTO2);
        subscDTO2.setId(subscDTO1.getId());
        assertThat(subscDTO1).isEqualTo(subscDTO2);
        subscDTO2.setId(2L);
        assertThat(subscDTO1).isNotEqualTo(subscDTO2);
        subscDTO1.setId(null);
        assertThat(subscDTO1).isNotEqualTo(subscDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subscMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subscMapper.fromId(null)).isNull();
    }
}
