package com.github.fabianmariuslink.vite.route;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RouteService {

    private final RouteRepository routeRepository;

    public Route addRoute(Route route) {
        return routeRepository.save(route);
    }
}