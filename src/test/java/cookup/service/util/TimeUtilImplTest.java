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
    Instant instant = Instant.now();
    ZoneId zoneId = ZoneId.systemDefault();
    Clock clock = Clock.fixed(instant, zoneId);
    TimeUtilImpl timeUtil = new TimeUtilImpl(clock);

    // when
    LocalDateTime now = timeUtil.now();

    // then
    assertEquals(LocalDateTime.now(clock), now);
  }
}