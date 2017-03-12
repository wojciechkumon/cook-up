package cookup.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import cookup.domain.account.Account;

@RestResource(exported = false)
public interface AccountDao extends JpaRepository<Account, Long> {

  Account findByEmail(String email);
}
