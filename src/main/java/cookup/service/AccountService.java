package cookup.service;

import cookup.dto.RegistrationDto;

public interface AccountService {

  void addAccount(RegistrationDto registrationDto);

  boolean isEmailTaken(String email);
}
