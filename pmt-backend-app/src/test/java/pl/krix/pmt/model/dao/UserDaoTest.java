package pl.krix.pmt.model.dao;


import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import pl.krix.pmt.model.entity.Role;
import pl.krix.pmt.model.entity.User;

/**
 * Created by krix on 02.09.16.
 */


@RunWith(SpringRunner.class)
@SpringBootTest
public class UserDaoTest {

    @Autowired
    private UserDao userDao;

    @Test
    public void addUserTest(){
        Long usersCount = userDao.count();
        User testUser = new User("Jack", "somePass", Role.ADMIN, true);
        userDao.save(testUser);
        assertThat(usersCount + 1 == userDao.count());
    }
}
