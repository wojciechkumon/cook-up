package cookup.service.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

import cookup.dao.AccountDao;
import cookup.domain.account.Account;
import cookup.domain.account.UserRole;
import cookup.domain.account.UserRoleType;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UserDetailServiceImplTest {
  private static final String EXISTING_EMAIL = "email@example.com";
  private static final String HASH = "#hash$hash#";
  private static final UserRoleType ROLE = UserRoleType.USER;
  private static final String NOT_EXISTING_EMAIL = "wrong@example.com";

  private static Account account;

  private UserDetailsService userDetailsService;


  @BeforeEach
  void setUp() {
    account = new Account();
    account.setId(17L);
    account.setEmail(EXISTING_EMAIL);
    account.setPasswordHash(HASH);
    account.setUserRoles(Collections.singleton(new UserRole(account, ROLE)));

    AccountDao accountDao = mock(AccountDao.class);
    when(accountDao.findByEmail(EXISTING_EMAIL)).thenReturn(account);
    when(accountDao.findByEmail(NOT_EXISTING_EMAIL)).thenReturn(null);

    userDetailsService = new UserDetailServiceImpl(accountDao);
  }

  @Test
  void should_return_existing_account_details() {
    // when
    UserDetails userDetails = userDetailsService.loadUserByUsername(EXISTING_EMAIL);

    // then
    assertEquals(account.getEmail(), userDetails.getUsername());
    assertEquals(account.getPasswordHash(), userDetails.getPassword());
    assertEquals(1, userDetails.getAuthorities().size());
    userDetails.getAuthorities()
        .forEach(auth -> assertEquals(ROLE.getRole(), auth.getAuthority()));
  }

  @Test
  void should_throw_not_found_exception() {
    assertThrows(UsernameNotFoundException.class,
        () -> userDetailsService.loadUserByUsername(NOT_EXISTING_EMAIL));
  }
}