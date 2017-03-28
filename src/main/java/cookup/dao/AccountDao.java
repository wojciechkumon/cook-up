package cookup.dao;

import org.springframework.data.repository.Repository;

import cookup.domain.account.Account;

public interface AccountDao extends Repository<Account, Long>, ReadOnlyDao<Account, Long> {

  Account findByEmail(String email);
}
