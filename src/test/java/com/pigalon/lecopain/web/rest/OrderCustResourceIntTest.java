package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.OrderCust;
import com.pigalon.lecopain.repository.OrderCustRepository;
import com.pigalon.lecopain.service.dto.OrderCustDTO;
import com.pigalon.lecopain.service.mapper.OrderCustMapper;
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
 * Test class for the OrderCustResource REST controller.
 *
 * @see OrderCustResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class OrderCustResourceIntTest {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final Instant DEFAULT_PAY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_PAY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final OrderState DEFAULT_STATUS = OrderState.CREATED;
    private static final OrderState UPDATED_STATUS = OrderState.PAID;

    private static final PromotionType DEFAULT_PROMOTION = PromotionType.PROMO1;
    private static final PromotionType UPDATED_PROMOTION = PromotionType.PROMO2;

    @Autowired
    private OrderCustRepository orderCustRepository;


    @Autowired
    private OrderCustMapper orderCustMapper;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderCustMockMvc;

    private OrderCust orderCust;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderCustResource orderCustResource = new OrderCustResource(orderCustRepository, orderCustMapper);
        this.restOrderCustMockMvc = MockMvcBuilders.standaloneSetup(orderCustResource)
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
    public static OrderCust createEntity(EntityManager em) {
        OrderCust orderCust = new OrderCust()
            .reference(DEFAULT_REFERENCE)
            .payDate(DEFAULT_PAY_DATE)
            .status(DEFAULT_STATUS)
            .promotion(DEFAULT_PROMOTION);
        return orderCust;
    }

    @Before
    public void initTest() {
        orderCust = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderCust() throws Exception {
        int databaseSizeBeforeCreate = orderCustRepository.findAll().size();

        // Create the OrderCust
        OrderCustDTO orderCustDTO = orderCustMapper.toDto(orderCust);
        restOrderCustMockMvc.perform(post("/api/order-custs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderCustDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderCust in the database
        List<OrderCust> orderCustList = orderCustRepository.findAll();
        assertThat(orderCustList).hasSize(databaseSizeBeforeCreate + 1);
        OrderCust testOrderCust = orderCustList.get(orderCustList.size() - 1);
        assertThat(testOrderCust.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testOrderCust.getPayDate()).isEqualTo(DEFAULT_PAY_DATE);
        assertThat(testOrderCust.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testOrderCust.getPromotion()).isEqualTo(DEFAULT_PROMOTION);
    }

    @Test
    @Transactional
    public void createOrderCustWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderCustRepository.findAll().size();

        // Create the OrderCust with an existing ID
        orderCust.setId(1L);
        OrderCustDTO orderCustDTO = orderCustMapper.toDto(orderCust);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderCustMockMvc.perform(post("/api/order-custs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderCustDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderCust in the database
        List<OrderCust> orderCustList = orderCustRepository.findAll();
        assertThat(orderCustList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderCusts() throws Exception {
        // Initialize the database
        orderCustRepository.saveAndFlush(orderCust);

        // Get all the orderCustList
        restOrderCustMockMvc.perform(get("/api/order-custs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderCust.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].payDate").value(hasItem(DEFAULT_PAY_DATE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].promotion").value(hasItem(DEFAULT_PROMOTION.toString())));
    }
    

    @Test
    @Transactional
    public void getOrderCust() throws Exception {
        // Initialize the database
        orderCustRepository.saveAndFlush(orderCust);

        // Get the orderCust
        restOrderCustMockMvc.perform(get("/api/order-custs/{id}", orderCust.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderCust.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE.toString()))
            .andExpect(jsonPath("$.payDate").value(DEFAULT_PAY_DATE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.promotion").value(DEFAULT_PROMOTION.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOrderCust() throws Exception {
        // Get the orderCust
        restOrderCustMockMvc.perform(get("/api/order-custs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderCust() throws Exception {
        // Initialize the database
        orderCustRepository.saveAndFlush(orderCust);

        int databaseSizeBeforeUpdate = orderCustRepository.findAll().size();

        // Update the orderCust
        OrderCust updatedOrderCust = orderCustRepository.findById(orderCust.getId()).get();
        // Disconnect from session so that the updates on updatedOrderCust are not directly saved in db
        em.detach(updatedOrderCust);
        updatedOrderCust
            .reference(UPDATED_REFERENCE)
            .payDate(UPDATED_PAY_DATE)
            .status(UPDATED_STATUS)
            .promotion(UPDATED_PROMOTION);
        OrderCustDTO orderCustDTO = orderCustMapper.toDto(updatedOrderCust);

        restOrderCustMockMvc.perform(put("/api/order-custs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderCustDTO)))
            .andExpect(status().isOk());

        // Validate the OrderCust in the database
        List<OrderCust> orderCustList = orderCustRepository.findAll();
        assertThat(orderCustList).hasSize(databaseSizeBeforeUpdate);
        OrderCust testOrderCust = orderCustList.get(orderCustList.size() - 1);
        assertThat(testOrderCust.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testOrderCust.getPayDate()).isEqualTo(UPDATED_PAY_DATE);
        assertThat(testOrderCust.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testOrderCust.getPromotion()).isEqualTo(UPDATED_PROMOTION);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderCust() throws Exception {
        int databaseSizeBeforeUpdate = orderCustRepository.findAll().size();

        // Create the OrderCust
        OrderCustDTO orderCustDTO = orderCustMapper.toDto(orderCust);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderCustMockMvc.perform(put("/api/order-custs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderCustDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderCust in the database
        List<OrderCust> orderCustList = orderCustRepository.findAll();
        assertThat(orderCustList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderCust() throws Exception {
        // Initialize the database
        orderCustRepository.saveAndFlush(orderCust);

        int databaseSizeBeforeDelete = orderCustRepository.findAll().size();

        // Get the orderCust
        restOrderCustMockMvc.perform(delete("/api/order-custs/{id}", orderCust.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderCust> orderCustList = orderCustRepository.findAll();
        assertThat(orderCustList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderCust.class);
        OrderCust orderCust1 = new OrderCust();
        orderCust1.setId(1L);
        OrderCust orderCust2 = new OrderCust();
        orderCust2.setId(orderCust1.getId());
        assertThat(orderCust1).isEqualTo(orderCust2);
        orderCust2.setId(2L);
        assertThat(orderCust1).isNotEqualTo(orderCust2);
        orderCust1.setId(null);
        assertThat(orderCust1).isNotEqualTo(orderCust2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderCustDTO.class);
        OrderCustDTO orderCustDTO1 = new OrderCustDTO();
        orderCustDTO1.setId(1L);
        OrderCustDTO orderCustDTO2 = new OrderCustDTO();
        assertThat(orderCustDTO1).isNotEqualTo(orderCustDTO2);
        orderCustDTO2.setId(orderCustDTO1.getId());
        assertThat(orderCustDTO1).isEqualTo(orderCustDTO2);
        orderCustDTO2.setId(2L);
        assertThat(orderCustDTO1).isNotEqualTo(orderCustDTO2);
        orderCustDTO1.setId(null);
        assertThat(orderCustDTO1).isNotEqualTo(orderCustDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderCustMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderCustMapper.fromId(null)).isNull();
    }
}
