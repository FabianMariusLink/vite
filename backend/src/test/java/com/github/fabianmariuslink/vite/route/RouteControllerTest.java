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
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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
    void addRoute_whenSaveRoute_thenGetStatus200AndReturnSavedRoute() throws Exception {
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

    @Test
    @DirtiesContext
    void getAllRoutes_whenNoEntriesExist_thenGetStatus200AndReturnEmptyList() throws Exception {
        // WHEN AND THEN
        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllRoutes_whenEntriesExist_thenGetStatus200AndReturnListOfAllRoutes() throws Exception {
        // GIVEN
        RouteDTO routeDTO1 = RouteDTO.builder()
                .name("SampleNameRoute")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();
        RouteDTO routeDTO2 = RouteDTO.builder()
                .name("SampleNameRoute2")
                .lat(57.99288610012664)
                .lng(9.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Marius")
                .description("A short text for example again.")
                .build();
        String routeAsJson1 = objectMapper.writeValueAsString(routeDTO1);
        String routeAsJson2 = objectMapper.writeValueAsString(routeDTO2);
        // WHEN
        MvcResult result1 = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routeAsJson1)
                )
                .andExpect(status().isOk())
                .andReturn();

        MvcResult result2 = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routeAsJson2)
                )
                .andExpect(status().isOk())
                .andReturn();

        Route savedRoute1 = objectMapper.readValue(result1.getResponse().getContentAsString(), Route.class);
        Route savedRoute2 = objectMapper.readValue(result2.getResponse().getContentAsString(), Route.class);

        List<Route> routes = List.of(savedRoute1, savedRoute2);
        String routesAsJson = objectMapper.writeValueAsString(routes);
        // THEN
        mockMvc.perform(get(BASE_URI))
                .andExpect(status().isOk())
                .andExpect(content().json(routesAsJson));
    }

    @Test
    @DirtiesContext
    void getRouteById_whenIdIsValid_thenGetStatus200AndReturnRoute() throws Exception {
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

        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routeAsJson)
                )
                .andExpect(status().isOk())
                .andReturn();

        Route savedRoute = objectMapper.readValue(result.getResponse().getContentAsString(), Route.class);
        String savedRouteAsJson = objectMapper.writeValueAsString(savedRoute);
        // WHEN AND THEN
        mockMvc.perform(get(BASE_URI + "/" + savedRoute.id()))
                .andExpect(status().isOk())
                .andExpect(content().json(savedRouteAsJson));
    }

    @Test
    @DirtiesContext
    void getRouteById_whenIdIsNotValid_thenGetStatus404AndThrowException() throws Exception {
        mockMvc.perform(get(BASE_URI + "/invalidId"))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Route not found!"));
    }

    @Test
    @DirtiesContext
    void deleteRouteById_whenIdIsValid_thenGetStatus200AndDeleteRoute() throws Exception {
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

        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routeAsJson)
                )
                .andExpect(status().isOk())
                .andReturn();

        Route savedRoute = objectMapper.readValue(result.getResponse().getContentAsString(), Route.class);
        // WHEN AND THEN
        mockMvc.perform(delete(BASE_URI + "/" + savedRoute.id()))
                .andExpect(status().isOk());

        mockMvc.perform(get(BASE_URI + "/" + savedRoute.id()))
                .andExpect(status().isNotFound())
                .andExpect(content().string("Route not found!"));
    }

    @Test
    @DirtiesContext
    void updateTodo_whenIdIsValid_thenGetStatus200AndUpdatedRoute() throws Exception {
        // GIVEN
        RouteDTO routeDTO = RouteDTO.builder()
                .name("SampleNameRoute1")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();

        String routeAsJson = objectMapper.writeValueAsString(routeDTO);

        MvcResult result = mockMvc.perform(post(BASE_URI)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(routeAsJson)
                )
                .andExpect(status().isOk())
                .andReturn();

        Route savedRoute = objectMapper.readValue(result.getResponse().getContentAsString(), Route.class);

        Route updateddRoute = Route.builder()
                .id(savedRoute.id())
                .name("UpdatedSampleNameRoute")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("New short text for example.")
                .build();

        String updatedRouteAsJson = objectMapper.writeValueAsString(updateddRoute);
        // WHEN AND THEN
        mockMvc.perform(put(BASE_URI + "/" + savedRoute.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updatedRouteAsJson)
                )
                .andExpect(status().isOk())
                .andExpect(content().json(updatedRouteAsJson));
    }
}