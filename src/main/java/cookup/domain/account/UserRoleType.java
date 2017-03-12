package cookup.domain.account;

public enum UserRoleType {
  ADMIN("ROLE_ADMIN"),
  PREMIUM_USER("ROLE_PREMIUM_USER"),
  USER("ROLE_USER");

  private final String role;

  UserRoleType(String role) {
    this.role = role;
  }

  public String getRole() {
    return role;
  }

}
