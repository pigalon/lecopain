package com.pigalon.lecopain.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.pigalon.lecopain.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.Location.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.Customer.class.getName() + ".orders", jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.OrderCust.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.OrderCust.class.getName() + ".lines", jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.OrderLine.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.Subsc.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.Subsc.class.getName() + ".lines", jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.SubLine.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.OrderHistory.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.ProductHistory.class.getName(), jcacheConfiguration);
            cm.createCache(com.pigalon.lecopain.domain.SubHistory.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
