package cookup.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.Repository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

import cookup.domain.account.Account;

public interface AccountDao extends Repository<Account, Long> {

  Account findByEmail(String email);

  List<Account> findAll();

  Iterable<Account> findAll(Iterable<Long> ids);

  Iterable<Account> findAll(Sort sort);

  Page<Account> findAll(Pageable pageable);

  Account findOne(Long id);

  @RestResource(exported = false)
  Account save(Account recipe);

  @RestResource(exported = false)
  void deleteAll();

  @RestResource(exported = false)
  void delete(Account recipe);
}
