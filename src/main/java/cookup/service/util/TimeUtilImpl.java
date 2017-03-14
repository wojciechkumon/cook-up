package cookup.service.util;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class TimeUtilImpl implements TimeUtil {
  private static final ZoneId UTC_ZONE_ID = ZoneId.of("UTC");

  @Override
  public LocalDateTime now() {
    return LocalDateTime.now(UTC_ZONE_ID);
  }
}
