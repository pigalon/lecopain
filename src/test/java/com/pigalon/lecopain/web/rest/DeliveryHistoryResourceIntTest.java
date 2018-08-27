package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.DeliveryHistory;
import com.pigalon.lecopain.repository.DeliveryHistoryRepository;
import com.pigalon.lecopain.service.DeliveryHistoryService;
import com.pigalon.lecopain.service.dto.DeliveryHistoryDTO;
import com.pigalon.lecopain.service.mapper.DeliveryHistoryMapper;
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

import com.pigalon.lecopain.domain.enumeration.DeliveryActionType;
/**
 * Test class for the DeliveryHistoryResource REST controller.
 *
 * @see DeliveryHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class DeliveryHistoryResourceIntTest {

    private static final Instant DEFAULT_ACTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final DeliveryActionType DEFAULT_ACTION = DeliveryActionType.CREATE;
    private static final DeliveryActionType UPDATED_ACTION = DeliveryActionType.UPDATE;

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    @Autowired
    private DeliveryHistoryRepository deliveryHistoryRepository;


    @Autowired
    private DeliveryHistoryMapper deliveryHistoryMapper;
    

    @Autowired
    private DeliveryHistoryService deliveryHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeliveryHistoryMockMvc;

    private DeliveryHistory deliveryHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryHistoryResource deliveryHistoryResource = new DeliveryHistoryResource(deliveryHistoryService);
        this.restDeliveryHistoryMockMvc = MockMvcBuilders.standaloneSetup(deliveryHistoryResource)
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
    public static DeliveryHistory createEntity(EntityManager em) {
        DeliveryHistory deliveryHistory = new DeliveryHistory()
            .actionDate(DEFAULT_ACTION_DATE)
            .action(DEFAULT_ACTION)
            .reason(DEFAULT_REASON);
        return deliveryHistory;
    }

    @Before
    public void initTest() {
        deliveryHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryHistory() throws Exception {
        int databaseSizeBeforeCreate = deliveryHistoryRepository.findAll().size();

        // Create the DeliveryHistory
        DeliveryHistoryDTO deliveryHistoryDTO = deliveryHistoryMapper.toDto(deliveryHistory);
        restDeliveryHistoryMockMvc.perform(post("/api/delivery-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the DeliveryHistory in the database
        List<DeliveryHistory> deliveryHistoryList = deliveryHistoryRepository.findAll();
        assertThat(deliveryHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryHistory testDeliveryHistory = deliveryHistoryList.get(deliveryHistoryList.size() - 1);
        assertThat(testDeliveryHistory.getActionDate()).isEqualTo(DEFAULT_ACTION_DATE);
        assertThat(testDeliveryHistory.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testDeliveryHistory.getReason()).isEqualTo(DEFAULT_REASON);
    }

    @Test
    @Transactional
    public void createDeliveryHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryHistoryRepository.findAll().size();

        // Create the DeliveryHistory with an existing ID
        deliveryHistory.setId(1L);
        DeliveryHistoryDTO deliveryHistoryDTO = deliveryHistoryMapper.toDto(deliveryHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryHistoryMockMvc.perform(post("/api/delivery-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryHistory in the database
        List<DeliveryHistory> deliveryHistoryList = deliveryHistoryRepository.findAll();
        assertThat(deliveryHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDeliveryHistories() throws Exception {
        // Initialize the database
        deliveryHistoryRepository.saveAndFlush(deliveryHistory);

        // Get all the deliveryHistoryList
        restDeliveryHistoryMockMvc.perform(get("/api/delivery-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].actionDate").value(hasItem(DEFAULT_ACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())));
    }
    

    @Test
    @Transactional
    public void getDeliveryHistory() throws Exception {
        // Initialize the database
        deliveryHistoryRepository.saveAndFlush(deliveryHistory);

        // Get the deliveryHistory
        restDeliveryHistoryMockMvc.perform(get("/api/delivery-histories/{id}", deliveryHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryHistory.getId().intValue()))
            .andExpect(jsonPath("$.actionDate").value(DEFAULT_ACTION_DATE.toString()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDeliveryHistory() throws Exception {
        // Get the deliveryHistory
        restDeliveryHistoryMockMvc.perform(get("/api/delivery-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryHistory() throws Exception {
        // Initialize the database
        deliveryHistoryRepository.saveAndFlush(deliveryHistory);

        int databaseSizeBeforeUpdate = deliveryHistoryRepository.findAll().size();

        // Update the deliveryHistory
        DeliveryHistory updatedDeliveryHistory = deliveryHistoryRepository.findById(deliveryHistory.getId()).get();
        // Disconnect from session so that the updates on updatedDeliveryHistory are not directly saved in db
        em.detach(updatedDeliveryHistory);
        updatedDeliveryHistory
            .actionDate(UPDATED_ACTION_DATE)
            .action(UPDATED_ACTION)
            .reason(UPDATED_REASON);
        DeliveryHistoryDTO deliveryHistoryDTO = deliveryHistoryMapper.toDto(updatedDeliveryHistory);

        restDeliveryHistoryMockMvc.perform(put("/api/delivery-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the DeliveryHistory in the database
        List<DeliveryHistory> deliveryHistoryList = deliveryHistoryRepository.findAll();
        assertThat(deliveryHistoryList).hasSize(databaseSizeBeforeUpdate);
        DeliveryHistory testDeliveryHistory = deliveryHistoryList.get(deliveryHistoryList.size() - 1);
        assertThat(testDeliveryHistory.getActionDate()).isEqualTo(UPDATED_ACTION_DATE);
        assertThat(testDeliveryHistory.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testDeliveryHistory.getReason()).isEqualTo(UPDATED_REASON);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryHistory() throws Exception {
        int databaseSizeBeforeUpdate = deliveryHistoryRepository.findAll().size();

        // Create the DeliveryHistory
        DeliveryHistoryDTO deliveryHistoryDTO = deliveryHistoryMapper.toDto(deliveryHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restDeliveryHistoryMockMvc.perform(put("/api/delivery-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryHistory in the database
        List<DeliveryHistory> deliveryHistoryList = deliveryHistoryRepository.findAll();
        assertThat(deliveryHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDeliveryHistory() throws Exception {
        // Initialize the database
        deliveryHistoryRepository.saveAndFlush(deliveryHistory);

        int databaseSizeBeforeDelete = deliveryHistoryRepository.findAll().size();

        // Get the deliveryHistory
        restDeliveryHistoryMockMvc.perform(delete("/api/delivery-histories/{id}", deliveryHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeliveryHistory> deliveryHistoryList = deliveryHistoryRepository.findAll();
        assertThat(deliveryHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryHistory.class);
        DeliveryHistory deliveryHistory1 = new DeliveryHistory();
        deliveryHistory1.setId(1L);
        DeliveryHistory deliveryHistory2 = new DeliveryHistory();
        deliveryHistory2.setId(deliveryHistory1.getId());
        assertThat(deliveryHistory1).isEqualTo(deliveryHistory2);
        deliveryHistory2.setId(2L);
        assertThat(deliveryHistory1).isNotEqualTo(deliveryHistory2);
        deliveryHistory1.setId(null);
        assertThat(deliveryHistory1).isNotEqualTo(deliveryHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryHistoryDTO.class);
        DeliveryHistoryDTO deliveryHistoryDTO1 = new DeliveryHistoryDTO();
        deliveryHistoryDTO1.setId(1L);
        DeliveryHistoryDTO deliveryHistoryDTO2 = new DeliveryHistoryDTO();
        assertThat(deliveryHistoryDTO1).isNotEqualTo(deliveryHistoryDTO2);
        deliveryHistoryDTO2.setId(deliveryHistoryDTO1.getId());
        assertThat(deliveryHistoryDTO1).isEqualTo(deliveryHistoryDTO2);
        deliveryHistoryDTO2.setId(2L);
        assertThat(deliveryHistoryDTO1).isNotEqualTo(deliveryHistoryDTO2);
        deliveryHistoryDTO1.setId(null);
        assertThat(deliveryHistoryDTO1).isNotEqualTo(deliveryHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(deliveryHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(deliveryHistoryMapper.fromId(null)).isNull();
    }
}
