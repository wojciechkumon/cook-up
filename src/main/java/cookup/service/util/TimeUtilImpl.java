package cookup.service.util;

import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.LocalDateTime;

@Service
public class TimeUtilImpl implements TimeUtil {
  private final Clock clock;

  TimeUtilImpl() {
    this(Clock.systemUTC());
  }

  TimeUtilImpl(Clock clock) {
    this.clock = clock;
  }

  @Override
  public LocalDateTime now() {
    return LocalDateTime.now(clock);
  }
}
