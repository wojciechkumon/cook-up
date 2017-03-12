package cookup.service.util;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class TimeUtilImpl implements TimeUtil {
  private static final ZoneId UTC_ZONE_ID = ZoneId.of("UTC");

  @Override
  public LocalDateTime now() {
    return LocalDateTime.now(UTC_ZONE_ID);
  }

  @Override
  public LocalDateTime fromEpochSeconds(Integer epochSeconds) {
    return Optional.ofNullable(epochSeconds)
        .map(Instant::ofEpochSecond)
        .map(instant -> LocalDateTime.ofInstant(instant, UTC_ZONE_ID))
        .orElse(null);
  }
}
