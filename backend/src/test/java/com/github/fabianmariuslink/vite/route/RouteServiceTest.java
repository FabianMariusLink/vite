package com.github.fabianmariuslink.vite.route;

import com.github.fabianmariuslink.vite.exception.RouteNotFoundException;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class RouteServiceTest {

    private RouteRepository routeRepository = mock(RouteRepository.class);
    private RouteService routeService = new RouteService(routeRepository);

    @Test
    void addRoute_whenSaveRoute_thenReturnSavedRoute() {
        // GIVEN
        RouteDTO routeDTO = RouteDTO.builder()
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
        Route actual = routeService.addRoute(routeDTO);
        // THEN
        verify(routeRepository).save(any(Route.class));
        assertEquals(expected, actual);
    }

    @Test
    void getAllRoutes_whenNoEntriesExist_thenReturnEmptyList() {
        // GIVEN
        List<Route> expected = List.of();
        // WHEN
        when(routeRepository.findAll()).thenReturn(expected);
        List<Route> actual = routeService.getAllRoutes();
        // THEN
        verify(routeRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllRoutes_whenEntriesExist_thenReturnListOfAllRoutes() {
        // GIVEN
        Route route1 = Route.builder()
                .id("655c6a9c9108d659e2770dd2")
                .name("SampleNameRoute1")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();
        Route route2 = Route.builder()
                .id("6655c6b079108d659e2770dd3")
                .name("SampleNameRoute2")
                .lat(57.99288610012664)
                .lng(9.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Marius")
                .description("A short text for example again.")
                .build();
        List<Route> expected = List.of(route1, route2);
        // WHEN
        when(routeRepository.findAll()).thenReturn(expected);
        List<Route> actual = routeService.getAllRoutes();
        // THEN
        verify(routeRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getRouteById_whenIdIsValid_thenReturnRoute() {
        // GIVEN
        Route expected = Route.builder()
                .id("655c6a9c9108d659e2770dd2")
                .name("SampleNameRoute1")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();
        // WHEN
        when(routeRepository.findById(expected.id())).thenReturn(Optional.of(expected));
        Route actual = routeService.getRouteById(expected.id());
        // THEN
        verify(routeRepository).findById(expected.id());
        assertEquals(expected, actual);
    }

    @Test
    void getRouteById_whenIdIsNotValid_thenThrowException() {
        assertThrows(RouteNotFoundException.class, () -> routeService.getRouteById("Route not found!"));
        verify(routeRepository).findById("Route not found!");
    }

    @Test
    void deleteRoute_whenIdIsValid_thenDeleteRoute() {
        // WHEN
        doNothing().when(routeRepository).deleteById(anyString());
        routeService.deleteRouteById("655e18e05dce5d24a77e25da");
        //THEN
        verify(routeRepository, times(1)).deleteById("655e18e05dce5d24a77e25da");
    }

    @Test
    void updateRoute_whenIdIsValid_thenReturnUpdatedRoute() {
        // GIVEN
        Route existingRoute = Route.builder()
                .id("655c6a9c9108d659e2770dd2")
                .name("SampleNameRoute1")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("A short text for example.")
                .build();
        RouteDTO updatedRoute = RouteDTO.builder()
                .name("UpdatedSampleNameRoute")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("New short text for example.")
                .build();
        Route expected = Route.builder()
                .id("655c6a9c9108d659e2770dd2")
                .name("UpdatedSampleNameRoute")
                .lat(47.99288610012664)
                .lng(8.56433932879702)
                .date(LocalDate.parse("2023-11-20"))
                .author("Fabian")
                .description("New short text for example.")
                .build();

        // WHEN
        when(routeRepository.save(any(Route.class))).thenReturn(expected);
        Route actual = routeService.updateRoute(existingRoute.id(), updatedRoute);
        // THEN
        verify(routeRepository).save(expected);
        assertEquals(expected, actual);
    }
}