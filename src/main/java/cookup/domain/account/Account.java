package cookup.domain.account;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "account")
public class Account {

  @Id
  @GeneratedValue
  @Column(name = "id", unique = true, nullable = false)
  private Long id;

  @Column(name = "steam_id", unique = true, nullable = false)
  private Long steamId;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "owner")
  private Set<AccountRole> accountRoles = new HashSet<>(0);

  public Account() {}

  public Account(Long steamId, Set<AccountRole> accountRoles) {
    this.steamId = steamId;
    this.accountRoles = accountRoles;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getSteamId() {
    return steamId;
  }

  public void setSteamId(Long steamId) {
    this.steamId = steamId;
  }

  public Set<AccountRole> getAccountRoles() {
    return accountRoles;
  }

  public void setAccountRoles(Set<AccountRole> accountRoles) {
    this.accountRoles = accountRoles;
  }
}
