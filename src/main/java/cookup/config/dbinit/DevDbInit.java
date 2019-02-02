package cookup.config.dbinit;

import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import cookup.config.Profiles;

@Component
@Profile({Profiles.DEV, Profiles.DB_MOCK})
public class DevDbInit implements DbInitializer {
  private final RecipeDbInitializer dbInitializer;

  public DevDbInit(RecipeDbInitializer dbInitializer) {
    this.dbInitializer = dbInitializer;
  }

  @Override
  @EventListener(ContextRefreshedEvent.class)
  public void init() {
    dbInitializer.init();
  }
}
