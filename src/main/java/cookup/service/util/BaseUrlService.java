package cookup.service.util;

import javax.servlet.http.HttpServletRequest;

public interface BaseUrlService {

  String getBaseUrlWithContext(HttpServletRequest request);
}
