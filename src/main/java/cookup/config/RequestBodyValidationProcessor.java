package cookup.config;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.validation.BeanPropertyBindingResult;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Validator;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdviceAdapter;

import java.lang.annotation.Annotation;
import java.lang.reflect.Type;

import javax.validation.Valid;

import cookup.exception.NotValidException;

@ControllerAdvice
public class RequestBodyValidationProcessor extends RequestBodyAdviceAdapter {
  private static final ObjectMapper MAPPER = new ObjectMapper();
  private final Validator validator;

  public RequestBodyValidationProcessor(@Autowired Validator validator) {
    this.validator = validator;
  }

  @Override
  public boolean supports(MethodParameter methodParameter, Type targetType,
                          Class<? extends HttpMessageConverter<?>> converterType) {
    if (methodParameter.getContainingClass().getAnnotation(RepositoryRestController.class) == null) {
      return false;
    }

    Annotation[] parameterAnnotations = methodParameter.getParameterAnnotations();
    for (Annotation annotation : parameterAnnotations) {
      if (annotation.annotationType().equals(Valid.class)) {
        return true;
      }
    }

    return false;
  }

  @Override
  public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter
      parameter, Type targetType, Class<? extends HttpMessageConverter<?>> converterType) {

    Object obj = super.afterBodyRead(body, inputMessage, parameter, targetType, converterType);
    BindingResult bindingResult = new BeanPropertyBindingResult(obj, obj.getClass().getCanonicalName());
    validator.validate(obj, bindingResult);
    if (bindingResult.hasErrors()) {
      throw new NotValidException(parameter, bindingResult, MAPPER);
    }

    return obj;
  }
}