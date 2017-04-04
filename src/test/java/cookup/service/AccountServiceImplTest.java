package cookup.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;

import cookup.dao.AccountDao;
import cookup.domain.account.Account;
import cookup.domain.account.UserRoleType;
import cookup.dto.RegistrationDto;
import cookup.service.util.TimeUtil;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class AccountServiceImplTest {
  private static final String FREE_EMAIL = "free@email.free";
  private static final String TAKEN_EMAIL = "taken@email.taken";
  private static final String PASSWORD = "s3cr3t";

  private AccountDao accountDao;
  private PasswordEncoder passwordEncoder;
  private TimeUtil timeUtil;

  private AccountServiceImpl accountService;

  @BeforeEach
  void setUp() {
    accountDao = mock(AccountDao.class);
    passwordEncoder = mock(PasswordEncoder.class);
    timeUtil = mock(TimeUtil.class);
    accountService = new AccountServiceImpl(accountDao, passwordEncoder, timeUtil);
  }

  @Test
  void should_return_account_with_set_fields() {
    // given
    LocalDateTime now = LocalDateTime.now();
    when(timeUtil.now()).thenReturn(now);
    when(passwordEncoder.encode(PASSWORD)).thenReturn("hashedPass");
    when(accountDao.save(any())).then(invocation -> {
      Account argAccount = (Account) invocation.getArguments()[0];
      argAccount.setId(5L);
      return argAccount;
    });
    RegistrationDto registrationDto = new RegistrationDto(FREE_EMAIL, PASSWORD, PASSWORD);

    // when
    Account account = accountService.addAccount(registrationDto);

    // then
    assertEquals(FREE_EMAIL, account.getEmail());
    assertEquals("hashedPass", account.getPasswordHash());
    assertEquals(5L, (long) account.getId());
    assertTrue(account.getCreatedRecipes().isEmpty());
    assertTrue(account.getFavouriteRecipes().isEmpty());
    assertEquals(now, account.getCreated());
    assertEquals(now, account.getUpdated());

    assertEquals(1, account.getUserRoles().size());
    account.getUserRoles().forEach(
        role -> assertEquals(UserRoleType.USER, role.getUserRoleType()));
  }

  @Test
  void email_should_be_taken() {
    // given
    when(accountDao.findByEmail(TAKEN_EMAIL)).thenReturn(new Account());

    // when
    boolean isEmailTaken = accountService.isEmailTaken(TAKEN_EMAIL);

    // then
    assertTrue(isEmailTaken);
  }

  @Test
  void email_should_be_free() {
    // given
    when(accountDao.findByEmail(FREE_EMAIL)).thenReturn(null);

    // when
    boolean isEmailTaken = accountService.isEmailTaken(FREE_EMAIL);

    // then
    assertFalse(isEmailTaken);
  }
}