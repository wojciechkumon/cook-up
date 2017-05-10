package cookup.service.pdf;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Objects;

import cookup.dao.RecipeDao;
import cookup.domain.recipe.Recipe;
import cookup.exception.PdfGeneratingException;

@Service
public class PdfGeneratorImpl implements PdfGenerator {
  private final RecipeDao recipeDao;

  public PdfGeneratorImpl(RecipeDao recipeDao) {
    this.recipeDao = recipeDao;
  }

  @Override
  public byte[] generatePdfBytesForRecipe(long recipeId) {
    Recipe recipe = getRecipe(recipeId);
    try (PDDocument document = new PDDocument()) {
      PDPage page = new PDPage();
      document.addPage(page);

      buildContent(document, page, recipe);

      return convertPdfToBytes(document);
    } catch (IOException e) {
      throw new PdfGeneratingException(e);
    }
  }

  private Recipe getRecipe(long recipeId) {
    Recipe recipe = recipeDao.findOne(recipeId);
    Objects.requireNonNull(recipe, "Recipe not found, id=" + recipeId);
    return recipe;
  }

  private void buildContent(PDDocument document, PDPage page, Recipe recipe) throws IOException {
    PDFont font = PDType1Font.HELVETICA_BOLD;
    try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
      contentStream.beginText();
      contentStream.setFont(font, 12);
      contentStream.moveTextPositionByAmount(100, 700);
      contentStream.drawString("Recipe coming soon: " + recipe.getName());
      contentStream.endText();
    }
  }

  private byte[] convertPdfToBytes(PDDocument document) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    document.save(outputStream);
    return outputStream.toByteArray();
  }
}
