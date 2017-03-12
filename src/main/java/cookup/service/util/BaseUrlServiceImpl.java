package cookup.service.util;

import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class BaseUrlServiceImpl implements BaseUrlService {

  @Override
  public String getBaseUrlWithContext(HttpServletRequest request) {
    StringBuffer url = request.getRequestURL();
    String uri = request.getRequestURI();
    String ctx = request.getContextPath();
    return url.substring(0, url.length() - uri.length() + ctx.length());
  }
}
