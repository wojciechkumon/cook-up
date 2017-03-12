package cookup.annotation;


import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;

import cookup.annotation.validator.UsernameUniqueValidator;

/**
 * Validation annotation that checks if given username is not in users database.
 */
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = UsernameUniqueValidator.class)
public @interface UsernameUnique {

  String message() default "{UsernameUnique.message}";

  Class<?>[] groups() default {};

  Class<?>[] payload() default {};
}
