package cookup.service.util;

import java.time.LocalDateTime;

public interface TimeUtil {

  LocalDateTime now();

  LocalDateTime fromEpochSeconds(Integer epochSeconds);
}
