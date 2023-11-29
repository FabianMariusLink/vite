package com.github.fabianmariuslink.vite.route;

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
}