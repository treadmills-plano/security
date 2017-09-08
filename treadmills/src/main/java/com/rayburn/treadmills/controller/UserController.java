package com.rayburn.treadmills.controller;

import com.rayburn.treadmills.dtos.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@RestController
public class UserController {
    @PreAuthorize("#oauth2.hasScope('read')")
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> users()  {
        List<User> users = new ArrayList<User>();
        User user = new User();
        user.setFirstName("first1");
        user.setLastName("last1");
        users.add(user);

        user = new User();
        user.setFirstName("first2");
        user.setLastName("last2");
        users.add(user);

        return users;
    }
}
