package cookup.dto;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import cookup.annotation.EmailUnique;
import cookup.annotation.FieldMatch;
import cookup.annotation.UsernameUnique;
import cookup.annotation.validator.RegexValidation;
import cookup.domain.account.AccountRestrictions;

@FieldMatch(first = "password", second = "matchingPassword")
public class RegistrationDto {

  @Size(min = AccountRestrictions.USERNAME_MIN_LENGTH, max = AccountRestrictions.USERNAME_MAX_LENGTH)
  @Pattern(regexp = RegexValidation.USERNAME)
  @UsernameUnique
  private String username;

  @NotBlank
  @Email
  @EmailUnique
  private String email;

  @Size(min = AccountRestrictions.PASSWORD_MIN_LENGTH, max = AccountRestrictions.PASSWORD_MAX_LENGTH)
  private String password;
  private String matchingPassword;


  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getMatchingPassword() {
    return matchingPassword;
  }

  public void setMatchingPassword(String matchingPassword) {
    this.matchingPassword = matchingPassword;
  }
}
