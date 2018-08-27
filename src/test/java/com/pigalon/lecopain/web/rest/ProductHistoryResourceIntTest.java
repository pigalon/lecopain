package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.ProductHistory;
import com.pigalon.lecopain.repository.ProductHistoryRepository;
import com.pigalon.lecopain.service.ProductHistoryService;
import com.pigalon.lecopain.service.dto.ProductHistoryDTO;
import com.pigalon.lecopain.service.mapper.ProductHistoryMapper;
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
 * Test class for the ProductHistoryResource REST controller.
 *
 * @see ProductHistoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class ProductHistoryResourceIntTest {

    private static final Instant DEFAULT_ACTION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ACTION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final ProductActionType DEFAULT_ACTION = ProductActionType.CREATE;
    private static final ProductActionType UPDATED_ACTION = ProductActionType.UPDATE;

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    @Autowired
    private ProductHistoryRepository productHistoryRepository;


    @Autowired
    private ProductHistoryMapper productHistoryMapper;
    

    @Autowired
    private ProductHistoryService productHistoryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductHistoryMockMvc;

    private ProductHistory productHistory;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductHistoryResource productHistoryResource = new ProductHistoryResource(productHistoryService);
        this.restProductHistoryMockMvc = MockMvcBuilders.standaloneSetup(productHistoryResource)
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
    public static ProductHistory createEntity(EntityManager em) {
        ProductHistory productHistory = new ProductHistory()
            .actionDate(DEFAULT_ACTION_DATE)
            .action(DEFAULT_ACTION)
            .reason(DEFAULT_REASON);
        return productHistory;
    }

    @Before
    public void initTest() {
        productHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductHistory() throws Exception {
        int databaseSizeBeforeCreate = productHistoryRepository.findAll().size();

        // Create the ProductHistory
        ProductHistoryDTO productHistoryDTO = productHistoryMapper.toDto(productHistory);
        restProductHistoryMockMvc.perform(post("/api/product-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productHistoryDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductHistory in the database
        List<ProductHistory> productHistoryList = productHistoryRepository.findAll();
        assertThat(productHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        ProductHistory testProductHistory = productHistoryList.get(productHistoryList.size() - 1);
        assertThat(testProductHistory.getActionDate()).isEqualTo(DEFAULT_ACTION_DATE);
        assertThat(testProductHistory.getAction()).isEqualTo(DEFAULT_ACTION);
        assertThat(testProductHistory.getReason()).isEqualTo(DEFAULT_REASON);
    }

    @Test
    @Transactional
    public void createProductHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productHistoryRepository.findAll().size();

        // Create the ProductHistory with an existing ID
        productHistory.setId(1L);
        ProductHistoryDTO productHistoryDTO = productHistoryMapper.toDto(productHistory);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductHistoryMockMvc.perform(post("/api/product-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductHistory in the database
        List<ProductHistory> productHistoryList = productHistoryRepository.findAll();
        assertThat(productHistoryList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductHistories() throws Exception {
        // Initialize the database
        productHistoryRepository.saveAndFlush(productHistory);

        // Get all the productHistoryList
        restProductHistoryMockMvc.perform(get("/api/product-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].actionDate").value(hasItem(DEFAULT_ACTION_DATE.toString())))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION.toString())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())));
    }
    

    @Test
    @Transactional
    public void getProductHistory() throws Exception {
        // Initialize the database
        productHistoryRepository.saveAndFlush(productHistory);

        // Get the productHistory
        restProductHistoryMockMvc.perform(get("/api/product-histories/{id}", productHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productHistory.getId().intValue()))
            .andExpect(jsonPath("$.actionDate").value(DEFAULT_ACTION_DATE.toString()))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION.toString()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProductHistory() throws Exception {
        // Get the productHistory
        restProductHistoryMockMvc.perform(get("/api/product-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductHistory() throws Exception {
        // Initialize the database
        productHistoryRepository.saveAndFlush(productHistory);

        int databaseSizeBeforeUpdate = productHistoryRepository.findAll().size();

        // Update the productHistory
        ProductHistory updatedProductHistory = productHistoryRepository.findById(productHistory.getId()).get();
        // Disconnect from session so that the updates on updatedProductHistory are not directly saved in db
        em.detach(updatedProductHistory);
        updatedProductHistory
            .actionDate(UPDATED_ACTION_DATE)
            .action(UPDATED_ACTION)
            .reason(UPDATED_REASON);
        ProductHistoryDTO productHistoryDTO = productHistoryMapper.toDto(updatedProductHistory);

        restProductHistoryMockMvc.perform(put("/api/product-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productHistoryDTO)))
            .andExpect(status().isOk());

        // Validate the ProductHistory in the database
        List<ProductHistory> productHistoryList = productHistoryRepository.findAll();
        assertThat(productHistoryList).hasSize(databaseSizeBeforeUpdate);
        ProductHistory testProductHistory = productHistoryList.get(productHistoryList.size() - 1);
        assertThat(testProductHistory.getActionDate()).isEqualTo(UPDATED_ACTION_DATE);
        assertThat(testProductHistory.getAction()).isEqualTo(UPDATED_ACTION);
        assertThat(testProductHistory.getReason()).isEqualTo(UPDATED_REASON);
    }

    @Test
    @Transactional
    public void updateNonExistingProductHistory() throws Exception {
        int databaseSizeBeforeUpdate = productHistoryRepository.findAll().size();

        // Create the ProductHistory
        ProductHistoryDTO productHistoryDTO = productHistoryMapper.toDto(productHistory);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restProductHistoryMockMvc.perform(put("/api/product-histories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productHistoryDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductHistory in the database
        List<ProductHistory> productHistoryList = productHistoryRepository.findAll();
        assertThat(productHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductHistory() throws Exception {
        // Initialize the database
        productHistoryRepository.saveAndFlush(productHistory);

        int databaseSizeBeforeDelete = productHistoryRepository.findAll().size();

        // Get the productHistory
        restProductHistoryMockMvc.perform(delete("/api/product-histories/{id}", productHistory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductHistory> productHistoryList = productHistoryRepository.findAll();
        assertThat(productHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductHistory.class);
        ProductHistory productHistory1 = new ProductHistory();
        productHistory1.setId(1L);
        ProductHistory productHistory2 = new ProductHistory();
        productHistory2.setId(productHistory1.getId());
        assertThat(productHistory1).isEqualTo(productHistory2);
        productHistory2.setId(2L);
        assertThat(productHistory1).isNotEqualTo(productHistory2);
        productHistory1.setId(null);
        assertThat(productHistory1).isNotEqualTo(productHistory2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductHistoryDTO.class);
        ProductHistoryDTO productHistoryDTO1 = new ProductHistoryDTO();
        productHistoryDTO1.setId(1L);
        ProductHistoryDTO productHistoryDTO2 = new ProductHistoryDTO();
        assertThat(productHistoryDTO1).isNotEqualTo(productHistoryDTO2);
        productHistoryDTO2.setId(productHistoryDTO1.getId());
        assertThat(productHistoryDTO1).isEqualTo(productHistoryDTO2);
        productHistoryDTO2.setId(2L);
        assertThat(productHistoryDTO1).isNotEqualTo(productHistoryDTO2);
        productHistoryDTO1.setId(null);
        assertThat(productHistoryDTO1).isNotEqualTo(productHistoryDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productHistoryMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productHistoryMapper.fromId(null)).isNull();
    }
}
