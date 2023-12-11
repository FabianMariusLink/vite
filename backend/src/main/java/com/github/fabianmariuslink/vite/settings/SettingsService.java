package com.github.fabianmariuslink.vite.settings;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Getter
@Service
public class SettingsService {
    @Value("${vite.google.maps.api.key}")
    private String googleMapsApiKey;

}
