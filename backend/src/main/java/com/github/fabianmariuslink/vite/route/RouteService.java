package com.github.fabianmariuslink.vite.route;

import com.github.fabianmariuslink.vite.exception.RouteNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;

    public Route addRoute(RouteDTO routeDetails) {
        return routeRepository.save(Route.builder()
                .name(routeDetails.name())
                .lat(routeDetails.lat())
                .lng(routeDetails.lng())
                .date(routeDetails.date())
                .author(routeDetails.author())
                .description(routeDetails.description())
                .build());
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Route getRouteById(String id) {
        return routeRepository.findById(id).orElseThrow(() -> new RouteNotFoundException("Route not found!"));
    }

    public void deleteRouteById(String id) {
        routeRepository.deleteById(id);
    }

    public Route updateRoute(String id, RouteDTO routeDetails) {
        return routeRepository.save(Route.builder()
                .id(id)
                .name(routeDetails.name())
                .lat(routeDetails.lat())
                .lng(routeDetails.lng())
                .date(routeDetails.date())
                .author(routeDetails.author())
                .description(routeDetails.description())
                .build());
    }
}