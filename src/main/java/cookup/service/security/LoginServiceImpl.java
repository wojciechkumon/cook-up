package cookup.service.security;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import cookup.domain.account.Account;
import cookup.domain.account.AccountRole;

@Service
public class LoginServiceImpl implements LoginService {

  @Override
  public void setLoggedInUser(Account account) {
    List<GrantedAuthority> grantedAuthorities = buildUserAuthority(account.getAccountRoles());
    Authentication auth =
        new UsernamePasswordAuthenticationToken(account.getSteamId(), null, grantedAuthorities);
    SecurityContextHolder.getContext().setAuthentication(auth);
  }

  private List<GrantedAuthority> buildUserAuthority(Collection<AccountRole> accountRoles) {
    return accountRoles.stream()
        .map(role -> new SimpleGrantedAuthority(role.getAccountRoleType().getRole()))
        .collect(Collectors.toList());
  }
}
