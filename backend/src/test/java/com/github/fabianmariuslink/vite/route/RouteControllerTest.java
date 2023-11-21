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

    private final static String BASE_URI = "/api/routes";

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void addRoute_expectStatus200AndReturnRoute() throws Exception {
        // GIVEN
        Route route = new Route(
                null,
                "SampleNameRoute",
                47.99288610012664,
                8.56433932879702,
                LocalDate.parse("2023-11-21"),
                "Fabian",
                "A short text for example.");
        String routeAsJson = objectMapper.writeValueAsString(route);
        // WHEN
        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routeAsJson)
                )
                .andExpect(status().isOk())
                .andReturn();
        //THEN
        Route savedRoute = objectMapper.readValue(result.getResponse().getContentAsString(), Route.class);
        assertNotNull(savedRoute.id());
        assertNotNull(savedRoute.name());
        assertNotEquals(0.0, savedRoute.lat());
        assertNotEquals(0.0, savedRoute.lng());
        assertNotNull(savedRoute.date());
        assertNotNull(savedRoute.author());
        assertNotNull(savedRoute.description());
    }
}