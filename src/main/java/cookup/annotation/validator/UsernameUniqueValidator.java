package cookup.annotation.validator;

import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import cookup.annotation.UsernameUnique;
import cookup.service.AccountService;

public class UsernameUniqueValidator implements ConstraintValidator<UsernameUnique, String> {
  private final AccountService accountService;

  @Autowired
  public UsernameUniqueValidator(AccountService accountService) {
    this.accountService = accountService;
  }

  @Override
  public void initialize(UsernameUnique usernameUnique) {}

  @Override
  public boolean isValid(String username, ConstraintValidatorContext context) {
    return !accountService.isUsernameTaken(username);
  }
}
