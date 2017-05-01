package cookup.controller.rest.security;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import cookup.config.RestConfig;
import cookup.dto.EmailNotTakenDto;
import cookup.exception.EmailTakenException;
import cookup.service.AccountService;

@RestController
@RequestMapping(RestConfig.API_BASE_PATH)
public class EmailNotTakenRestController {
  private final AccountService accountService;

  EmailNotTakenRestController(AccountService accountService) {
    this.accountService = accountService;
  }

  @PostMapping("/emailNotTaken")
  void emailFree(@Valid @RequestBody EmailNotTakenDto emailNotTakenDto) {
    if (accountService.isEmailTaken(emailNotTakenDto.getEmail())) {
      throw new EmailTakenException();
    }
  }
}
