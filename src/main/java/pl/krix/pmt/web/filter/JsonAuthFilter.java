package pl.krix.pmt.web.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.krix.pmt.web.api.entity.UserAuthEntity;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

/**
 * Created by krix on 05.09.16.
 */

public class JsonAuthFilter extends UsernamePasswordAuthenticationFilter {

    private String password;

    private String login;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        if (MediaType.APPLICATION_JSON_VALUE.equals(request.getContentType())) {
            try {
                setLoginAndPasswordFromHttpRequest(request);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return super.attemptAuthentication(request, response);
    }

    private void setLoginAndPasswordFromHttpRequest(HttpServletRequest request) throws IOException {
        UserAuthEntity userCredentials = retrieveUserCredentialsFromRequestObject(request);
        this.password = userCredentials.getPassword();
        this.login = userCredentials.getLogin();
    }

    private UserAuthEntity retrieveUserCredentialsFromRequestObject(HttpServletRequest request) throws IOException {
        String reqContent = getRequestContentAsString(request);
        return objectMapper.readValue(reqContent, UserAuthEntity.class);
    }

    private String getRequestContentAsString(HttpServletRequest request) throws IOException {
        return request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
    }

    @Override
    protected String obtainPassword(HttpServletRequest request) {
        String password = null;
        if (MediaType.APPLICATION_JSON_VALUE.equals(request.getContentType())) {
            password = this.password;
        }
        return password;
    }

    @Override
    protected String obtainUsername(HttpServletRequest request){
        String username = null;
        if (MediaType.APPLICATION_JSON_VALUE.equals(request.getContentType())) {
            username = this.login;
        }
        return username;
    }

}
