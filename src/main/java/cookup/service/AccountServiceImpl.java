package cookup.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;

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


  public AccountServiceImpl(AccountDao accountDao, PasswordEncoder passwordEncoder,
                            TimeUtil timeUtil) {
    this.accountDao = accountDao;
    this.passwordEncoder = passwordEncoder;
    this.timeUtil = timeUtil;
  }

  @Override
  public void addAccount(RegistrationDto registrationDto) {
    Account newAccount = new Account();
    newAccount.setEmail(registrationDto.getEmail());
    newAccount.setPasswordHash(passwordEncoder.encode(registrationDto.getPassword()));
    newAccount.setUserRoles(buildUserRoles(newAccount));
    LocalDateTime now = timeUtil.now();
    newAccount.setUpdated(now);
    newAccount.setCreated(now);
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

  @Override
  public boolean isEmailTaken(String email) {
    return accountDao.findByEmail(email) != null;
  }
}
