package cookup.domain.account;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import cookup.domain.recipe.Recipe;

@Entity
public class Account {

  @Id
  @GeneratedValue
  private Long id;

  @Column(name = "email", unique = true, nullable = false,
      length = AccountRestrictions.EMAIL_MAX_LENGTH)
  private String email;

  @Column(name = "password_hash", nullable = false,
      length = AccountRestrictions.PASSWORD_HASH_MAX_LENGTH)
  private String passwordHash;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "owner")
  private Set<UserRole> userRoles = new HashSet<>(0);

  @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
  @JoinTable(name = "favourite_recipes",
      joinColumns = @JoinColumn(name = "account_id"),
      inverseJoinColumns = @JoinColumn(name = "recipe_id"))
  private Set<Recipe> favouriteRecipes = new HashSet<>(0);

  @Column(nullable = false)
  private LocalDateTime created;

  @Column(nullable = false)
  private LocalDateTime updated;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  public Set<UserRole> getUserRoles() {
    return userRoles;
  }

  public void setUserRoles(Set<UserRole> userRoles) {
    this.userRoles = userRoles;
  }

  public LocalDateTime getCreated() {
    return created;
  }

  public void setCreated(LocalDateTime created) {
    this.created = created;
  }

  public LocalDateTime getUpdated() {
    return updated;
  }

  public void setUpdated(LocalDateTime updated) {
    this.updated = updated;
  }

  public Set<Recipe> getFavouriteRecipes() {
    return favouriteRecipes;
  }

  public void setFavouriteRecipes(Set<Recipe> favouriteRecipes) {
    this.favouriteRecipes = favouriteRecipes;
  }
}
