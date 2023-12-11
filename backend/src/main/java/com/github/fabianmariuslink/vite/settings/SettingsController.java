package com.github.fabianmariuslink.vite.settings;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {
    @Value("${vite.google.maps.api.key}")
    private String googleMapsApiKey;

    @GetMapping
    public String getGoogleMapsApiKey(){
        return googleMapsApiKey;
    }
}
