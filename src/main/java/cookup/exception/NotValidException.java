package cookup.exception;

import com.fasterxml.jackson.annotation.JsonRawValue;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.core.MethodParameter;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NotValidException extends RuntimeException {
  private final MethodParameter parameter;
  private final BindingResult bindingResult;
  private final ObjectMapper mapper;


  public NotValidException(MethodParameter parameter, BindingResult bindingResult,
                           ObjectMapper mapper) {
    this.parameter = parameter;
    this.bindingResult = bindingResult;
    this.mapper = mapper;
  }

  public MethodParameter getParameter() {
    return this.parameter;
  }

  public BindingResult getBindingResult() {
    return this.bindingResult;
  }


  @Override
  @JsonRawValue
  public String getMessage() {
    List<Object> errors = new ArrayList<>();
    bindingResult.getFieldErrors().forEach(fieldError -> {
      Map<String, Object> map = new HashMap<>();
      map.put("field", fieldError.getField());
      map.put("defaultMessage", fieldError.getDefaultMessage());
      errors.add(map);
    });

    try {
      String escapedJson = mapper.writeValueAsString(errors);
      return mapper.writerWithDefaultPrettyPrinter()
          .writeValueAsString(mapper.readValue(escapedJson, Object.class));
    } catch (Exception e) {
      StringBuilder sb = new StringBuilder("Validation failed for argument at index ")
          .append(this.parameter.getParameterIndex()).append(" in method: ")
          .append(this.parameter.getMethod().toGenericString())
          .append(", with ").append(this.bindingResult.getErrorCount()).append(" error(s): ");
      for (ObjectError error : this.bindingResult.getAllErrors()) {
        sb.append("[").append(error).append("] ");
      }
      return sb.toString();
    }
  }
}
