package cookup.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

import cookup.dao.AccountDao;
import cookup.domain.account.Account;
import cookup.domain.account.UserRole;
import cookup.domain.account.UserRoleType;
import cookup.dto.RegistrationDto;

@Service
public class AccountService {
  private final AccountDao accountDao;
  private final PasswordEncoder passwordEncoder;


  @Autowired
  public AccountService(AccountDao accountDao, PasswordEncoder passwordEncoder) {
    this.accountDao = accountDao;
    this.passwordEncoder = passwordEncoder;
  }

  public void addAccount(RegistrationDto registrationDto) {
    Account newAccount = new Account();
    newAccount.setEmail(registrationDto.getEmail());
    newAccount.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
    newAccount.setUserRoles(buildUserRoles(newAccount));
    accountDao.save(newAccount);
  }

  private HashSet<UserRole> buildUserRoles(Account newAccount) {
    UserRole role = new UserRole();
    role.setUserRoleType(UserRoleType.USER);
    role.setOwner(newAccount);
    HashSet<UserRole> userRoles = new HashSet<>();
    userRoles.add(role);
    return userRoles;
  }

  public boolean isEmailTaken(String email) {
    return accountDao.findByEmail(email) != null;
  }
}
