package pl.krix.pmt.web.api.user.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import pl.krix.pmt.model.dao.UserDao;
import pl.krix.pmt.model.entity.Role;
import pl.krix.pmt.model.entity.User;
import pl.krix.pmt.service.UserService;
import pl.krix.pmt.web.api.entity.UserAuthEntity;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/**
 * Created by krix on 04.09.16.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class LoginTest {

    private static final String TEST_USERNAME = "kowalski";
    private static final String TEST_PASSWORD = "password";
    private static final String X_CSRF_HEADER_KEY = "X-CSRF-HEADER";

    private static final String APPLICATION_ROOT_URI = "/";
    private static final String APPLICATION_LOGIN_URI = "/api/user/auth";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserDao userDao;

    @Before
    public void setup(){
        userService.createUser(TEST_USERNAME, TEST_PASSWORD, Role.USER);
    }

    @After
    public void cleanup(){
        User user = userDao.findByName(TEST_USERNAME);
        userService.deleteUser(user);
    }

    @Test
    public void testlogin() throws Exception {
        UserAuthEntity userCredentials = new UserAuthEntity(TEST_USERNAME, TEST_PASSWORD);
        MvcResult firstRequestResult = performGetOnMainPage();
        performLogin(firstRequestResult, userCredentials);
    }

    private void performLogin(MvcResult firstRequestResult, UserAuthEntity userCredentials) throws Exception {
        String csrfHeaderName = getCsrfHeaderName(firstRequestResult);
        String token = getCsrfToken(firstRequestResult);
        MockHttpSession session = getRequestSession(firstRequestResult);
        mockMvc.perform(
                post(APPLICATION_LOGIN_URI, userCredentials)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userCredentials))
                        .header(csrfHeaderName, token)
                        .session(session)
        )
                .andExpect(status().isFound());
    }

    private MvcResult performGetOnMainPage() throws Exception {
        return mockMvc.perform(get(APPLICATION_ROOT_URI)).andReturn();
    }

    private String getCsrfHeaderName(MvcResult mvcResult){
        return mvcResult.getResponse().getHeader(X_CSRF_HEADER_KEY);
    }

    private String getCsrfToken(MvcResult mvcResult){
        return mvcResult.getResponse().getHeader(getCsrfHeaderName(mvcResult));
    }

    private MockHttpSession getRequestSession(MvcResult mvcResult){
        return (MockHttpSession) mvcResult.getRequest().getSession();
    }
}
