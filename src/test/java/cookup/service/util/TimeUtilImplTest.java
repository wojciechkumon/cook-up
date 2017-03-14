package cookup.service.util;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

class TimeUtilImplTest {

  private TimeUtilImpl timeUtil;

  @BeforeEach
  void setUp() {
    timeUtil = new TimeUtilImpl();
  }

  @Test
  void shouldBeUtcZone() {
    // when
    LocalDateTime now = timeUtil.now();
    ZonedDateTime utcNow = now.atZone(ZoneId.of("UTC"));

    // then
    assertEquals(utcNow.getHour(), now.getHour());
    assertEquals(utcNow.getMinute(), now.getMinute());
  }
}