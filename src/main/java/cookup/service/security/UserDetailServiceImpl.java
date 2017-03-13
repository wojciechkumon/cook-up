package cookup.service.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
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

@Service
public class UserDetailServiceImpl implements UserDetailsService {
  private final AccountDao accountDao;

  public UserDetailServiceImpl(AccountDao accountDao) {
    this.accountDao = accountDao;
  }


  @Override
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Account account = accountDao.findByEmail(email);
    if (account == null) {
      throw new UsernameNotFoundException("Email not found: " + email);
    }
    List<GrantedAuthority> authorities = buildUserAuthority(account.getUserRoles());
    return buildUserForAuthentication(email, account, authorities);
  }

  private List<GrantedAuthority> buildUserAuthority(Collection<UserRole> userRoles) {
    return userRoles.stream()
        .map(role -> new SimpleGrantedAuthority(role.getUserRoleType().getRole()))
        .collect(Collectors.toList());
  }

  private User buildUserForAuthentication(String username, Account account,
                                          List<GrantedAuthority> authorities) {
    return new User(username, account.getPasswordHash(), authorities);
  }
}
