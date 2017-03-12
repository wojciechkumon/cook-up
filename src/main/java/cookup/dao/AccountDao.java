package cookup.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import cookup.domain.account.Account;

public interface AccountDao extends JpaRepository<Account, Long> {

  Account findByUsername(String username);

  Account findByEmail(String email);
}
