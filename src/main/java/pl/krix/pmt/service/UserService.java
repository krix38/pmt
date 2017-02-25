package pl.krix.pmt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import pl.krix.pmt.model.dao.UserDao;
import pl.krix.pmt.model.entity.Role;
import pl.krix.pmt.model.entity.User;

/**
 * Created by krix on 04.09.16.
 */

@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public User createUser(String name, String password, Role role){
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt(10));
        return userDao.save(new User(name, passwordHash, role, true));
    }

    public void deleteUser(User user){
        userDao.delete(user);
    }
}
