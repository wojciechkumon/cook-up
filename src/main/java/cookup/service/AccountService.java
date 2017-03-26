package cookup.service;

import cookup.domain.account.Account;
import cookup.dto.RegistrationDto;

public interface AccountService {

  Account addAccount(RegistrationDto registrationDto);

  boolean isEmailTaken(String email);
}
