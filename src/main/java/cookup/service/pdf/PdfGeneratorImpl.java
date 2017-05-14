package cookup.service.pdf;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import cookup.dao.RecipeDao;
import cookup.domain.recipe.Recipe;
import cookup.exception.PdfGeneratingException;

@Service
public class PdfGeneratorImpl implements PdfGenerator {
  private static final PDFont TITLE_FONT = PDType1Font.HELVETICA_BOLD;
  private static final PDFont FONT = PDType1Font.HELVETICA;
  private static final float TITLE_FONT_SIZE = 16;
  private static final float FONT_SIZE = 12;
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
    float leading = 1.5f * FONT_SIZE;
    PDRectangle mediaBox = page.getMediaBox();
    float margin = 72;
    float width = mediaBox.getWidth() - 2 * margin;
    float startX = mediaBox.getLowerLeftX() + margin;
    float startY = mediaBox.getUpperRightY() - margin;

    List<String> titleLines = splitToLines(TITLE_FONT, TITLE_FONT_SIZE, width, recipe.getName());
    List<String> descriptionLines = splitToLines(FONT, FONT_SIZE, width,
        recipe.getCookingDescription());

    try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
      contentStream.beginText();
      contentStream.newLineAtOffset(startX, startY);

      printTitle(leading, titleLines, contentStream);
      printDescription(leading, descriptionLines, contentStream);

      contentStream.endText();
    }
  }

  private void printTitle(float leading, List<String> titleLines, PDPageContentStream contentStream)
      throws IOException {
    contentStream.setFont(TITLE_FONT, TITLE_FONT_SIZE);
    for (String line : titleLines) {
      contentStream.showText(line);
      contentStream.newLineAtOffset(0, -leading);
    }
    contentStream.newLineAtOffset(0, -leading);
  }

  private void printDescription(float leading, List<String> descriptionLines,
                                PDPageContentStream contentStream) throws IOException {
    contentStream.setFont(FONT, FONT_SIZE);
    for (String line : descriptionLines) {
      contentStream.showText(line);
      contentStream.newLineAtOffset(0, -leading);
    }
  }

  private List<String> splitToLines(PDFont pdfFont, float fontSize, float width, String text)
      throws IOException {
    text = text.replaceAll("(\n\r)|(\r)|(\n)", " ");
    List<String> lines = new ArrayList<>();
    int lastSpace = -1;
    while (text.length() > 0) {
      int spaceIndex = text.indexOf(' ', lastSpace + 1);
      if (spaceIndex < 0) {
        spaceIndex = text.length();
      }
      String subString = text.substring(0, spaceIndex);
      float size = fontSize * pdfFont.getStringWidth(subString) / 1000;
      if (size > width) {
        if (lastSpace < 0) {
          lastSpace = spaceIndex;
        }
        subString = text.substring(0, lastSpace);
        lines.add(subString);
        text = text.substring(lastSpace).trim();
        lastSpace = -1;
      } else if (spaceIndex == text.length()) {
        lines.add(text);
        text = "";
      } else {
        lastSpace = spaceIndex;
      }
    }
    return lines;
  }

  private byte[] convertPdfToBytes(PDDocument document) throws IOException {
    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    document.save(outputStream);
    return outputStream.toByteArray();
  }
}
