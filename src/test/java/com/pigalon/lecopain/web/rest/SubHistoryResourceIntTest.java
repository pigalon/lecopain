package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.SubHistory;
import com.pigalon.lecopain.repository.SubHistoryRepository;
import com.pigalon.lecopain.service.SubHistoryService;
import com.pigalon.lecopain.service.dto.SubHistoryDTO;
import com.pigalon.lecopain.service.mapper.SubHistoryMapper;
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

import com.pigalon.lecopain.domain.enumeration.ProductActionType;
/**
 * Test class for the SubHistoryResource REST controller.
 *
 * @see SubHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class SubHistoryResourceIntTest {

    private static final Instant DEFAULT_ACTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ProductActionType DEFAULT_ACTION = ProductActionType.CREATE;
    private static final ProductActionType UPDATED_ACTION = ProductActionType.UPDATE;

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    @Autowired
    private SubHistoryRepository subHistoryRepository;


    @Autowired
    private SubHistoryMapper subHistoryMapper;
    

    @Autowired
    private SubHistoryService subHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubHistoryMockMvc;

    private SubHistory subHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubHistoryResource subHistoryResource = new SubHistoryResource(subHistoryService);
        this.restSubHistoryMockMvc = MockMvcBuilders.standaloneSetup(subHistoryResource)
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
    public static SubHistory createEntity(EntityManager em) {
        SubHistory subHistory = new SubHistory()
            .actionDate(DEFAULT_ACTION_DATE)
            .action(DEFAULT_ACTION)
            .reason(DEFAULT_REASON);
        return subHistory;
    }

    @Before
    public void initTest() {
        subHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubHistory() throws Exception {
        int databaseSizeBeforeCreate = subHistoryRepository.findAll().size();

        // Create the SubHistory
        SubHistoryDTO subHistoryDTO = subHistoryMapper.toDto(subHistory);
        restSubHistoryMockMvc.perform(post("/api/sub-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the SubHistory in the database
        List<SubHistory> subHistoryList = subHistoryRepository.findAll();
        assertThat(subHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        SubHistory testSubHistory = subHistoryList.get(subHistoryList.size() - 1);
        assertThat(testSubHistory.getActionDate()).isEqualTo(DEFAULT_ACTION_DATE);
        assertThat(testSubHistory.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testSubHistory.getReason()).isEqualTo(DEFAULT_REASON);
    }

    @Test
    @Transactional
    public void createSubHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subHistoryRepository.findAll().size();

        // Create the SubHistory with an existing ID
        subHistory.setId(1L);
        SubHistoryDTO subHistoryDTO = subHistoryMapper.toDto(subHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubHistoryMockMvc.perform(post("/api/sub-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubHistory in the database
        List<SubHistory> subHistoryList = subHistoryRepository.findAll();
        assertThat(subHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubHistories() throws Exception {
        // Initialize the database
        subHistoryRepository.saveAndFlush(subHistory);

        // Get all the subHistoryList
        restSubHistoryMockMvc.perform(get("/api/sub-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].actionDate").value(hasItem(DEFAULT_ACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())));
    }
    

    @Test
    @Transactional
    public void getSubHistory() throws Exception {
        // Initialize the database
        subHistoryRepository.saveAndFlush(subHistory);

        // Get the subHistory
        restSubHistoryMockMvc.perform(get("/api/sub-histories/{id}", subHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subHistory.getId().intValue()))
            .andExpect(jsonPath("$.actionDate").value(DEFAULT_ACTION_DATE.toString()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSubHistory() throws Exception {
        // Get the subHistory
        restSubHistoryMockMvc.perform(get("/api/sub-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubHistory() throws Exception {
        // Initialize the database
        subHistoryRepository.saveAndFlush(subHistory);

        int databaseSizeBeforeUpdate = subHistoryRepository.findAll().size();

        // Update the subHistory
        SubHistory updatedSubHistory = subHistoryRepository.findById(subHistory.getId()).get();
        // Disconnect from session so that the updates on updatedSubHistory are not directly saved in db
        em.detach(updatedSubHistory);
        updatedSubHistory
            .actionDate(UPDATED_ACTION_DATE)
            .action(UPDATED_ACTION)
            .reason(UPDATED_REASON);
        SubHistoryDTO subHistoryDTO = subHistoryMapper.toDto(updatedSubHistory);

        restSubHistoryMockMvc.perform(put("/api/sub-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the SubHistory in the database
        List<SubHistory> subHistoryList = subHistoryRepository.findAll();
        assertThat(subHistoryList).hasSize(databaseSizeBeforeUpdate);
        SubHistory testSubHistory = subHistoryList.get(subHistoryList.size() - 1);
        assertThat(testSubHistory.getActionDate()).isEqualTo(UPDATED_ACTION_DATE);
        assertThat(testSubHistory.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testSubHistory.getReason()).isEqualTo(UPDATED_REASON);
    }

    @Test
    @Transactional
    public void updateNonExistingSubHistory() throws Exception {
        int databaseSizeBeforeUpdate = subHistoryRepository.findAll().size();

        // Create the SubHistory
        SubHistoryDTO subHistoryDTO = subHistoryMapper.toDto(subHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restSubHistoryMockMvc.perform(put("/api/sub-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubHistory in the database
        List<SubHistory> subHistoryList = subHistoryRepository.findAll();
        assertThat(subHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubHistory() throws Exception {
        // Initialize the database
        subHistoryRepository.saveAndFlush(subHistory);

        int databaseSizeBeforeDelete = subHistoryRepository.findAll().size();

        // Get the subHistory
        restSubHistoryMockMvc.perform(delete("/api/sub-histories/{id}", subHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubHistory> subHistoryList = subHistoryRepository.findAll();
        assertThat(subHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubHistory.class);
        SubHistory subHistory1 = new SubHistory();
        subHistory1.setId(1L);
        SubHistory subHistory2 = new SubHistory();
        subHistory2.setId(subHistory1.getId());
        assertThat(subHistory1).isEqualTo(subHistory2);
        subHistory2.setId(2L);
        assertThat(subHistory1).isNotEqualTo(subHistory2);
        subHistory1.setId(null);
        assertThat(subHistory1).isNotEqualTo(subHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubHistoryDTO.class);
        SubHistoryDTO subHistoryDTO1 = new SubHistoryDTO();
        subHistoryDTO1.setId(1L);
        SubHistoryDTO subHistoryDTO2 = new SubHistoryDTO();
        assertThat(subHistoryDTO1).isNotEqualTo(subHistoryDTO2);
        subHistoryDTO2.setId(subHistoryDTO1.getId());
        assertThat(subHistoryDTO1).isEqualTo(subHistoryDTO2);
        subHistoryDTO2.setId(2L);
        assertThat(subHistoryDTO1).isNotEqualTo(subHistoryDTO2);
        subHistoryDTO1.setId(null);
        assertThat(subHistoryDTO1).isNotEqualTo(subHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subHistoryMapper.fromId(null)).isNull();
    }
}
