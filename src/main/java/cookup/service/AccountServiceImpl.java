package cookup.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import cookup.dao.AccountDao;
import cookup.domain.account.Account;
import cookup.domain.account.UserRole;
import cookup.domain.account.UserRoleType;
import cookup.dto.RegistrationDto;
import cookup.service.util.TimeUtil;

@Service
public class AccountServiceImpl implements AccountService {
  private final AccountDao accountDao;
  private final PasswordEncoder passwordEncoder;
  private final TimeUtil timeUtil;


  AccountServiceImpl(AccountDao accountDao, PasswordEncoder passwordEncoder, TimeUtil timeUtil) {
    this.accountDao = accountDao;
    this.passwordEncoder = passwordEncoder;
    this.timeUtil = timeUtil;
  }

  @Override
  public Account addAccount(RegistrationDto registrationDto) {
    Account newAccount = new Account();
    newAccount.setEmail(registrationDto.getEmail().toLowerCase());
    newAccount.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
    newAccount.setUserRoles(buildUserRoles(newAccount));
    LocalDateTime now = timeUtil.now();
    newAccount.setUpdated(now);
    newAccount.setCreated(now);
    return accountDao.save(newAccount);
  }

  private Set<UserRole> buildUserRoles(Account newAccount) {
    UserRole role = new UserRole();
    role.setUserRoleType(UserRoleType.USER);
    role.setOwner(newAccount);
    HashSet<UserRole> roles = new HashSet<>(1);
    roles.add(role);
    return roles;
  }

  @Override
  public boolean isEmailTaken(String email) {
    return accountDao.findByEmail(email.toLowerCase()) != null;
  }

  @Override
  public long getAccountId(String email) {
    return accountDao.findByEmail(email).getId();
  }
}
