package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.OrderMain;
import com.pigalon.lecopain.repository.OrderMainRepository;
import com.pigalon.lecopain.service.dto.OrderMainDTO;
import com.pigalon.lecopain.service.mapper.OrderMainMapper;
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

import com.pigalon.lecopain.domain.enumeration.OrderState;
import com.pigalon.lecopain.domain.enumeration.PromotionType;
/**
 * Test class for the OrderMainResource REST controller.
 *
 * @see OrderMainResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class OrderMainResourceIntTest {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final Instant DEFAULT_PAY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final OrderState DEFAULT_STATUS = OrderState.CREATED;
    private static final OrderState UPDATED_STATUS = OrderState.PAID;

    private static final PromotionType DEFAULT_PROMOTION = PromotionType.PROMO1;
    private static final PromotionType UPDATED_PROMOTION = PromotionType.PROMO2;

    @Autowired
    private OrderMainRepository orderMainRepository;


    @Autowired
    private OrderMainMapper orderMainMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderMainMockMvc;

    private OrderMain orderMain;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderMainResource orderMainResource = new OrderMainResource(orderMainRepository, orderMainMapper);
        this.restOrderMainMockMvc = MockMvcBuilders.standaloneSetup(orderMainResource)
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
    public static OrderMain createEntity(EntityManager em) {
        OrderMain orderMain = new OrderMain()
            .reference(DEFAULT_REFERENCE)
            .payDate(DEFAULT_PAY_DATE)
            .status(DEFAULT_STATUS)
            .promotion(DEFAULT_PROMOTION);
        return orderMain;
    }

    @Before
    public void initTest() {
        orderMain = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderMain() throws Exception {
        int databaseSizeBeforeCreate = orderMainRepository.findAll().size();

        // Create the OrderMain
        OrderMainDTO orderMainDTO = orderMainMapper.toDto(orderMain);
        restOrderMainMockMvc.perform(post("/api/order-mains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderMainDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderMain in the database
        List<OrderMain> orderMainList = orderMainRepository.findAll();
        assertThat(orderMainList).hasSize(databaseSizeBeforeCreate + 1);
        OrderMain testOrderMain = orderMainList.get(orderMainList.size() - 1);
        assertThat(testOrderMain.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testOrderMain.getPayDate()).isEqualTo(DEFAULT_PAY_DATE);
        assertThat(testOrderMain.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testOrderMain.getPromotion()).isEqualTo(DEFAULT_PROMOTION);
    }

    @Test
    @Transactional
    public void createOrderMainWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderMainRepository.findAll().size();

        // Create the OrderMain with an existing ID
        orderMain.setId(1L);
        OrderMainDTO orderMainDTO = orderMainMapper.toDto(orderMain);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderMainMockMvc.perform(post("/api/order-mains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderMainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderMain in the database
        List<OrderMain> orderMainList = orderMainRepository.findAll();
        assertThat(orderMainList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderMains() throws Exception {
        // Initialize the database
        orderMainRepository.saveAndFlush(orderMain);

        // Get all the orderMainList
        restOrderMainMockMvc.perform(get("/api/order-mains?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderMain.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].payDate").value(hasItem(DEFAULT_PAY_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].promotion").value(hasItem(DEFAULT_PROMOTION.toString())));
    }
    

    @Test
    @Transactional
    public void getOrderMain() throws Exception {
        // Initialize the database
        orderMainRepository.saveAndFlush(orderMain);

        // Get the orderMain
        restOrderMainMockMvc.perform(get("/api/order-mains/{id}", orderMain.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderMain.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE.toString()))
            .andExpect(jsonPath("$.payDate").value(DEFAULT_PAY_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.promotion").value(DEFAULT_PROMOTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOrderMain() throws Exception {
        // Get the orderMain
        restOrderMainMockMvc.perform(get("/api/order-mains/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderMain() throws Exception {
        // Initialize the database
        orderMainRepository.saveAndFlush(orderMain);

        int databaseSizeBeforeUpdate = orderMainRepository.findAll().size();

        // Update the orderMain
        OrderMain updatedOrderMain = orderMainRepository.findById(orderMain.getId()).get();
        // Disconnect from session so that the updates on updatedOrderMain are not directly saved in db
        em.detach(updatedOrderMain);
        updatedOrderMain
            .reference(UPDATED_REFERENCE)
            .payDate(UPDATED_PAY_DATE)
            .status(UPDATED_STATUS)
            .promotion(UPDATED_PROMOTION);
        OrderMainDTO orderMainDTO = orderMainMapper.toDto(updatedOrderMain);

        restOrderMainMockMvc.perform(put("/api/order-mains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderMainDTO)))
            .andExpect(status().isOk());

        // Validate the OrderMain in the database
        List<OrderMain> orderMainList = orderMainRepository.findAll();
        assertThat(orderMainList).hasSize(databaseSizeBeforeUpdate);
        OrderMain testOrderMain = orderMainList.get(orderMainList.size() - 1);
        assertThat(testOrderMain.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testOrderMain.getPayDate()).isEqualTo(UPDATED_PAY_DATE);
        assertThat(testOrderMain.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrderMain.getPromotion()).isEqualTo(UPDATED_PROMOTION);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderMain() throws Exception {
        int databaseSizeBeforeUpdate = orderMainRepository.findAll().size();

        // Create the OrderMain
        OrderMainDTO orderMainDTO = orderMainMapper.toDto(orderMain);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restOrderMainMockMvc.perform(put("/api/order-mains")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderMainDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderMain in the database
        List<OrderMain> orderMainList = orderMainRepository.findAll();
        assertThat(orderMainList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderMain() throws Exception {
        // Initialize the database
        orderMainRepository.saveAndFlush(orderMain);

        int databaseSizeBeforeDelete = orderMainRepository.findAll().size();

        // Get the orderMain
        restOrderMainMockMvc.perform(delete("/api/order-mains/{id}", orderMain.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderMain> orderMainList = orderMainRepository.findAll();
        assertThat(orderMainList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderMain.class);
        OrderMain orderMain1 = new OrderMain();
        orderMain1.setId(1L);
        OrderMain orderMain2 = new OrderMain();
        orderMain2.setId(orderMain1.getId());
        assertThat(orderMain1).isEqualTo(orderMain2);
        orderMain2.setId(2L);
        assertThat(orderMain1).isNotEqualTo(orderMain2);
        orderMain1.setId(null);
        assertThat(orderMain1).isNotEqualTo(orderMain2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderMainDTO.class);
        OrderMainDTO orderMainDTO1 = new OrderMainDTO();
        orderMainDTO1.setId(1L);
        OrderMainDTO orderMainDTO2 = new OrderMainDTO();
        assertThat(orderMainDTO1).isNotEqualTo(orderMainDTO2);
        orderMainDTO2.setId(orderMainDTO1.getId());
        assertThat(orderMainDTO1).isEqualTo(orderMainDTO2);
        orderMainDTO2.setId(2L);
        assertThat(orderMainDTO1).isNotEqualTo(orderMainDTO2);
        orderMainDTO1.setId(null);
        assertThat(orderMainDTO1).isNotEqualTo(orderMainDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderMainMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderMainMapper.fromId(null)).isNull();
    }
}
