package com.github.fabianmariuslink.vite.route;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RouteServiceTest {

    private RouteRepository routeRepository = mock(RouteRepository.class);
    private RouteService routeService = new RouteService(routeRepository);

    @Test
    void addRoute_saveAndReturnRoute() {
        // GIVEN
        RouteDTO routeDetails = RouteDTO.builder()
                .name("SampleNameRoute")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();

        Route expected = Route.builder()
                .id("655c6a9c9108d659e2770dd2")
                .name("SampleNameRoute")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();
        // WHEN
        when(routeRepository.save(any(Route.class))).thenReturn(expected);
        Route actual = routeService.addRoute(routeDetails);
        // THEN
        verify(routeRepository).save(any(Route.class));
        assertEquals(expected, actual);
    }
}