package pl.krix.pmt.model.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.krix.pmt.model.entity.User;

/**
 * Created by krix on 31.08.16.
 */

@Repository
public interface UserDao extends CrudRepository<User, Long> {
    User findByName(String name);
}
