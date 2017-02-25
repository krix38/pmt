package pl.krix.pmt.web.api.entity;

/**
 * Created by krix on 05.09.16.
 */
public class UserAuthEntity {

    private String login;

    private String password;

    public UserAuthEntity() {
    }

    public UserAuthEntity(String login, String password) {
        this.login = login;
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
