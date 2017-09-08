package com.rayburn.treadmills.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController
public class ActivitiesController {
    @PreAuthorize("#oauth2.hasScope('read')")
    @RequestMapping(value = "/printSystemOut", method = RequestMethod.GET)
    public void printSystemOut()  {
        String version = System.getProperty("java.version");
        Properties prop = System.getProperties();
        System.out.println("This is System out.println:" + version);
        System.out.println ("JVM Vendor : " + prop.getProperty("java.vendor") );
    }
}

