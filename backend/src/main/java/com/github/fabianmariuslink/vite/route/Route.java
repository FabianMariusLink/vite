package com.github.fabianmariuslink.vite.route;

import lombok.Builder;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Builder
public record Route(
        @Id
        String id,
        String name,
        double lat,
        double lng,
        LocalDate date,
        String author,
        String description
) {
}
