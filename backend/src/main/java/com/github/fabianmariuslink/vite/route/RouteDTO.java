package com.github.fabianmariuslink.vite.route;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record RouteDTO(
        String name,
        double lat,
        double lng,
        LocalDate date,
        String author,
        String description
) {
}