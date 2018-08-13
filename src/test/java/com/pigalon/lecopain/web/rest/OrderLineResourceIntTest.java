package com.pigalon.lecopain.web.rest;

import com.pigalon.lecopain.LecopainApp;

import com.pigalon.lecopain.domain.OrderLine;
import com.pigalon.lecopain.repository.OrderLineRepository;
import com.pigalon.lecopain.service.OrderLineService;
import com.pigalon.lecopain.service.dto.OrderLineDTO;
import com.pigalon.lecopain.service.mapper.OrderLineMapper;
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

import com.pigalon.lecopain.domain.enumeration.LineState;
/**
 * Test class for the OrderLineResource REST controller.
 *
 * @see OrderLineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LecopainApp.class)
public class OrderLineResourceIntTest {

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final Double DEFAULT_REDUCTION = 1D;
    private static final Double UPDATED_REDUCTION = 2D;

    private static final LineState DEFAULT_STATUS = LineState.LIN1;
    private static final LineState UPDATED_STATUS = LineState.LIN2;

    @Autowired
    private OrderLineRepository orderLineRepository;


    @Autowired
    private OrderLineMapper orderLineMapper;
    

    @Autowired
    private OrderLineService orderLineService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOrderLineMockMvc;

    private OrderLine orderLine;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrderLineResource orderLineResource = new OrderLineResource(orderLineService);
        this.restOrderLineMockMvc = MockMvcBuilders.standaloneSetup(orderLineResource)
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
    public static OrderLine createEntity(EntityManager em) {
        OrderLine orderLine = new OrderLine()
            .reference(DEFAULT_REFERENCE)
            .quantity(DEFAULT_QUANTITY)
            .price(DEFAULT_PRICE)
            .reduction(DEFAULT_REDUCTION)
            .status(DEFAULT_STATUS);
        return orderLine;
    }

    @Before
    public void initTest() {
        orderLine = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderLine() throws Exception {
        int databaseSizeBeforeCreate = orderLineRepository.findAll().size();

        // Create the OrderLine
        OrderLineDTO orderLineDTO = orderLineMapper.toDto(orderLine);
        restOrderLineMockMvc.perform(post("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderLineDTO)))
            .andExpect(status().isCreated());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeCreate + 1);
        OrderLine testOrderLine = orderLineList.get(orderLineList.size() - 1);
        assertThat(testOrderLine.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testOrderLine.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testOrderLine.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testOrderLine.getReduction()).isEqualTo(DEFAULT_REDUCTION);
        assertThat(testOrderLine.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createOrderLineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderLineRepository.findAll().size();

        // Create the OrderLine with an existing ID
        orderLine.setId(1L);
        OrderLineDTO orderLineDTO = orderLineMapper.toDto(orderLine);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderLineMockMvc.perform(post("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllOrderLines() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        // Get all the orderLineList
        restOrderLineMockMvc.perform(get("/api/order-lines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderLine.getId().intValue())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].reduction").value(hasItem(DEFAULT_REDUCTION.doubleValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    

    @Test
    @Transactional
    public void getOrderLine() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        // Get the orderLine
        restOrderLineMockMvc.perform(get("/api/order-lines/{id}", orderLine.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(orderLine.getId().intValue()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE.toString()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.reduction").value(DEFAULT_REDUCTION.doubleValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOrderLine() throws Exception {
        // Get the orderLine
        restOrderLineMockMvc.perform(get("/api/order-lines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderLine() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        int databaseSizeBeforeUpdate = orderLineRepository.findAll().size();

        // Update the orderLine
        OrderLine updatedOrderLine = orderLineRepository.findById(orderLine.getId()).get();
        // Disconnect from session so that the updates on updatedOrderLine are not directly saved in db
        em.detach(updatedOrderLine);
        updatedOrderLine
            .reference(UPDATED_REFERENCE)
            .quantity(UPDATED_QUANTITY)
            .price(UPDATED_PRICE)
            .reduction(UPDATED_REDUCTION)
            .status(UPDATED_STATUS);
        OrderLineDTO orderLineDTO = orderLineMapper.toDto(updatedOrderLine);

        restOrderLineMockMvc.perform(put("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderLineDTO)))
            .andExpect(status().isOk());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeUpdate);
        OrderLine testOrderLine = orderLineList.get(orderLineList.size() - 1);
        assertThat(testOrderLine.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testOrderLine.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testOrderLine.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testOrderLine.getReduction()).isEqualTo(UPDATED_REDUCTION);
        assertThat(testOrderLine.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderLine() throws Exception {
        int databaseSizeBeforeUpdate = orderLineRepository.findAll().size();

        // Create the OrderLine
        OrderLineDTO orderLineDTO = orderLineMapper.toDto(orderLine);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restOrderLineMockMvc.perform(put("/api/order-lines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(orderLineDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OrderLine in the database
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderLine() throws Exception {
        // Initialize the database
        orderLineRepository.saveAndFlush(orderLine);

        int databaseSizeBeforeDelete = orderLineRepository.findAll().size();

        // Get the orderLine
        restOrderLineMockMvc.perform(delete("/api/order-lines/{id}", orderLine.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<OrderLine> orderLineList = orderLineRepository.findAll();
        assertThat(orderLineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderLine.class);
        OrderLine orderLine1 = new OrderLine();
        orderLine1.setId(1L);
        OrderLine orderLine2 = new OrderLine();
        orderLine2.setId(orderLine1.getId());
        assertThat(orderLine1).isEqualTo(orderLine2);
        orderLine2.setId(2L);
        assertThat(orderLine1).isNotEqualTo(orderLine2);
        orderLine1.setId(null);
        assertThat(orderLine1).isNotEqualTo(orderLine2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderLineDTO.class);
        OrderLineDTO orderLineDTO1 = new OrderLineDTO();
        orderLineDTO1.setId(1L);
        OrderLineDTO orderLineDTO2 = new OrderLineDTO();
        assertThat(orderLineDTO1).isNotEqualTo(orderLineDTO2);
        orderLineDTO2.setId(orderLineDTO1.getId());
        assertThat(orderLineDTO1).isEqualTo(orderLineDTO2);
        orderLineDTO2.setId(2L);
        assertThat(orderLineDTO1).isNotEqualTo(orderLineDTO2);
        orderLineDTO1.setId(null);
        assertThat(orderLineDTO1).isNotEqualTo(orderLineDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(orderLineMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(orderLineMapper.fromId(null)).isNull();
    }
}
