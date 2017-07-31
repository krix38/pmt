package pl.krix.pmt.model.entity;

/**
 * Created by krix on 31.08.16.
 */
public enum Role {
    ADMIN("admin"),
    OPERATOR("operator"),
    USER("user");

    private String role;

    Role(String role){
        this.role = role;
    }
}
