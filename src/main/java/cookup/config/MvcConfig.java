package cookup.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;

import java.util.List;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE)
public class MvcConfig extends WebMvcConfigurerAdapter {

  @Autowired
  @Qualifier("repositoryExporterHandlerAdapter")
  RequestMappingHandlerAdapter repositoryExporterHandlerAdapter;

  @Override
  public void addArgumentResolvers(
      List<HandlerMethodArgumentResolver> argumentResolvers) {
    List<HandlerMethodArgumentResolver> customArgumentResolvers =
        repositoryExporterHandlerAdapter.getCustomArgumentResolvers();
    argumentResolvers.addAll(customArgumentResolvers);
  }
}
