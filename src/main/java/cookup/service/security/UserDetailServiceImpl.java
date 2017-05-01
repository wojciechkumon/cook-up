package cookup.service.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import cookup.dao.AccountDao;
import cookup.domain.account.Account;
import cookup.domain.account.UserRole;
import cookup.domain.account.UserWithId;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
  private final AccountDao accountDao;

  UserDetailServiceImpl(AccountDao accountDao) {
    this.accountDao = accountDao;
  }


  @Override
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Account account = accountDao.findByEmail(email.toLowerCase());
    if (account == null) {
      throw new UsernameNotFoundException("Email not found for auth: " + email);
    }
    return buildUserForAuthentication(account);
  }

  private UserWithId buildUserForAuthentication(Account account) {
    List<GrantedAuthority> authorities = buildUserAuthority(account.getUserRoles());
    return new UserWithId(account.getEmail(), account.getId(), account.getPasswordHash(),
        authorities);
  }

  private List<GrantedAuthority> buildUserAuthority(Collection<UserRole> userRoles) {
    return userRoles.stream()
        .map(role -> new SimpleGrantedAuthority(role.getUserRoleType().getRole()))
        .collect(Collectors.toList());
  }
}
