package cookup.service.pdf;

public interface PdfGenerator {

  byte[] generatePdfBytesForRecipe(long recipeId);
}
