package cookup.dto;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Size;

import cookup.annotation.EmailUnique;
import cookup.annotation.FieldMatch;
import cookup.domain.account.AccountRestrictions;

@FieldMatch(first = "password", second = "matchingPassword")
public class RegistrationDto {

  @NotBlank
  @Email
  @EmailUnique
  @Size(max = AccountRestrictions.EMAIL_MAX_LENGTH)
  private String email;

  @Size(min = AccountRestrictions.PASSWORD_MIN_LENGTH, max = AccountRestrictions.PASSWORD_MAX_LENGTH)
  private String password;
  private String matchingPassword;


  public RegistrationDto() {}

  public RegistrationDto(String email, String password, String matchingPassword) {
    this.email = email;
    this.password = password;
    this.matchingPassword = matchingPassword;
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
