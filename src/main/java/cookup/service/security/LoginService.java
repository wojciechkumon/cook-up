package cookup.service.security;

import cookup.domain.account.Account;

public interface LoginService {

  void setLoggedInUser(Account account);
}
