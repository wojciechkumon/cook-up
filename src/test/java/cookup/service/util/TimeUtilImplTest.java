package cookup.service.util;

import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TimeUtilImplTest {

  @Test
  void shouldBeUtcZone() {
    // given
    Clock clock = Clock.fixed(Instant.now(), ZoneId.systemDefault());
    TimeUtilImpl timeUtil = new TimeUtilImpl(clock);

    // when
    LocalDateTime now = timeUtil.now();

    // then
    assertEquals(LocalDateTime.now(clock), now);
  }
}