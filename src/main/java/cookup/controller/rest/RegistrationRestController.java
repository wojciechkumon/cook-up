package cookup.controller.rest;

import org.springframework.data.rest.webmvc.PersistentEntityResource;
import org.springframework.data.rest.webmvc.PersistentEntityResourceAssembler;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import cookup.domain.account.Account;
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
  @ResponseStatus(HttpStatus.CREATED)
  PersistentEntityResource register(@Valid @RequestBody RegistrationDto registrationDto,
                                    PersistentEntityResourceAssembler resourceAssembler) {
    Account newAccount = accountService.addAccount(registrationDto);
    return resourceAssembler.toResource(newAccount);
  }
}
