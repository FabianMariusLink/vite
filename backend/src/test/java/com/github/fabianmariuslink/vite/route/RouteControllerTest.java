package com.github.fabianmariuslink.vite.route;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class RouteControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    private final static String BASE_URI = "/api/routes";

    @Test
    @DirtiesContext
    void addRoute_expectStatus200AndReturnRoute() throws Exception {
        // GIVEN
        RouteDTO routeDTO = RouteDTO.builder()
                .name("SampleNameRoute")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();
        String routeAsJson = objectMapper.writeValueAsString(routeDTO);
        // WHEN
        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routeAsJson)
                )
                .andExpect(status().isOk())
                .andReturn();
        // THEN
        Route savedRoute = objectMapper.readValue(result.getResponse().getContentAsString(), Route.class);
        assertNotNull(savedRoute.id());
        assertEquals(savedRoute.name(), routeDTO.name());
        assertEquals(savedRoute.lat(), routeDTO.lat());
        assertEquals(savedRoute.lng(), routeDTO.lng());
        assertEquals(savedRoute.date(), routeDTO.date());
        assertEquals(savedRoute.author(), routeDTO.author());
        assertEquals(savedRoute.description(), routeDTO.description());
    }
}