package cookup.domain.account;

public enum AccountRoleType {
  ADMIN("ROLE_ADMIN"),
  USER("ROLE_USER");

  private final String role;

  AccountRoleType(String role) {
    this.role = role;
  }

  public String getRole() {
    return role;
  }
}
