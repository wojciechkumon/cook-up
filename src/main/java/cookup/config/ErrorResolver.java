package cookup.config;

import org.springframework.boot.autoconfigure.web.ErrorViewResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

@Configuration
public class ErrorResolver implements ErrorViewResolver {

  @Override
  public ModelAndView resolveErrorView(HttpServletRequest request,
                                       HttpStatus status, Map<String, Object> model) {
    if (status == HttpStatus.NOT_FOUND) {
      return new ModelAndView("home");
    }
    return null;
  }
}
