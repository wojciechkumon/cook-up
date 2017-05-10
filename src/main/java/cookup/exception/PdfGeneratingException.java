package cookup.exception;

public class PdfGeneratingException extends RuntimeException {

  public PdfGeneratingException(Throwable throwable) {
    super(throwable);
  }
}
