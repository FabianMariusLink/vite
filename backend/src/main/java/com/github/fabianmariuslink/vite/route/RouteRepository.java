package com.github.fabianmariuslink.vite.route;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends MongoRepository<Route, String> {
}