package cookup.domain.account;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class UserWithId extends User {
  private final long id;

  public UserWithId(String username, long id, String password, Collection<? extends GrantedAuthority> authorities) {
    super(username, password, authorities);
    this.id = id;
  }

  public UserWithId(String username, long id, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities) {
    super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
    this.id = id;
  }

  public long getId() {
    return id;
  }

  public String getEmail() {
    return this.getUsername();
  }
}
