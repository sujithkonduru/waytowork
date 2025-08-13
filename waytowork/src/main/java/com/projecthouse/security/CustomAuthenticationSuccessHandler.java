package com.projecthouse.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collection;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
                                        throws IOException, ServletException {

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String redirectURL = request.getContextPath();
        for (GrantedAuthority authority : authorities) {
            if (authority.getAuthority().equals("ROLE_CLIENT")) {
                redirectURL += "/client/dashboard";
                break;
            } else if (authority.getAuthority().equals("ROLE_WORKER")) {
                redirectURL += "/worker/dashboard";
                break;
            }
        }

        // Default fallback if no known role is found
        response.sendRedirect(redirectURL);
    }
}
