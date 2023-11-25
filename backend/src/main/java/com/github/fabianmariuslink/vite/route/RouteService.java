package com.github.fabianmariuslink.vite.route;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;

    public Route addRoute(RouteDTO routeDetails) {
        return routeRepository.save(Route.builder()
                .id(null)
                .name(routeDetails.name())
                .lat(routeDetails.lat())
                .lng(routeDetails.lng())
                .date(routeDetails.date())
                .author(routeDetails.author())
                .description(routeDetails.description())
                .build());
    }
}