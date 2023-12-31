package com.github.fabianmariuslink.vite.route;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {

    private final RouteService routeService;

    @PostMapping
    public Route addRoute(@RequestBody RouteDTO routeDetails) {
        return routeService.addRoute(routeDetails);
    }

    @GetMapping
    public List<Route> getAllRoutes() {
        return routeService.getAllRoutes();
    }

    @GetMapping("/{id}")
    public Route getRouteById(@PathVariable String id) {
        return routeService.getRouteById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRouteById(@PathVariable String id) {
        routeService.deleteRouteById(id);
    }

    @PutMapping("/{id}")
    public Route updateRoute(@PathVariable String id, @RequestBody RouteDTO routeDetails) {
        return routeService.updateRoute(id, routeDetails);
    }
}