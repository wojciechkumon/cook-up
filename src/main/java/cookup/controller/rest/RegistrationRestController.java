package cookup.controller.rest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import cookup.dto.RegistrationDto;
import cookup.service.AccountService;

@RestController
@RequestMapping("/api")
public class RegistrationRestController {
  private final AccountService accountService;

  RegistrationRestController(AccountService accountService) {
    this.accountService = accountService;
  }

  @PostMapping("/register")
  void register(@Valid @RequestBody RegistrationDto registrationDto) {
    accountService.addAccount(registrationDto);
  }
}
