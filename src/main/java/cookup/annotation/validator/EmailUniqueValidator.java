package cookup.annotation.validator;

import java.util.Optional;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import cookup.annotation.EmailUnique;
import cookup.service.AccountService;

public class EmailUniqueValidator implements ConstraintValidator<EmailUnique, String> {
  private final AccountService accountService;

  public EmailUniqueValidator(AccountService accountService) {
    this.accountService = accountService;
  }

  @Override
  public void initialize(EmailUnique constraintAnnotation) {}

  @Override
  public boolean isValid(String email, ConstraintValidatorContext context) {
    return Optional.ofNullable(email)
        .map(mail -> !accountService.isEmailTaken(mail))
        .orElse(false);
  }
}
