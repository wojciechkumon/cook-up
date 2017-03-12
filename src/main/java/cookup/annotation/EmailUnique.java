package cookup.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;

import cookup.annotation.validator.EmailUniqueValidator;

/**
 * Validation annotation that checks if given email is not in users database.
 */
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = EmailUniqueValidator.class)
public @interface EmailUnique {

  String message() default "{EmailUnique.message}";

  Class<?>[] groups() default {};

  Class<?>[] payload() default {};

}
