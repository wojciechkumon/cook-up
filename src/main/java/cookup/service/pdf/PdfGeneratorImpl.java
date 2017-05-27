package cookup.service.pdf;

import cookup.domain.recipe.Ingredient;
import cookup.domain.recipe.RecipeIngredient;
import java.awt.Color;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
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

  private static final DecimalFormat DECIMAL_FORMAT = new DecimalFormat("#.##",
      DecimalFormatSymbols.getInstance(Locale.US));
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
    float startY = mediaBox.getUpperRightY() - margin + 20;

    String cookingTime = "Cooking time: " + recipe.getCookingTimeMinutes().toString() + " min";
    String kcal = "Kcal: " + recipe.getKcal().toString() + " kcal";
    String servings = "Servings: " + recipe.getServings().toString();

    List<String> titleLines = splitToLines(TITLE_FONT, TITLE_FONT_SIZE, width, recipe.getName());
    List<String> cookingTimeLines = splitToLines(TITLE_FONT, TITLE_FONT_SIZE, width, cookingTime);
    List<String> kcalLines = splitToLines(TITLE_FONT, TITLE_FONT_SIZE, width, kcal);
    List<String> ingredientLines = getIngredientLines(recipe);
    List<String> servingsLines = splitToLines(TITLE_FONT, TITLE_FONT_SIZE, width, servings);
    List<String> descriptionLines = splitToLines(FONT, FONT_SIZE, width,
        recipe.getCookingDescription());

    try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
      contentStream.beginText();
      contentStream.newLineAtOffset(startX, startY);

      printCookUp(leading, contentStream, width);
      printTitle(leading, titleLines, contentStream);
      printCookingTimeMinutes(leading, cookingTimeLines, contentStream);
      printKcal(leading, kcalLines, contentStream);
      printServings(leading, servingsLines, contentStream);
      printIngredients(leading, ingredientLines, contentStream);
      printDescription(leading, descriptionLines, contentStream);

      contentStream.endText();
    }
  }

  private void printCookUp(float leading, PDPageContentStream contentStream, float width)
      throws IOException {
    contentStream.newLineAtOffset(width - 50, 0);
    contentStream.setFont(TITLE_FONT, 20);
    contentStream.setNonStrokingColor(166, 3, 13);
    printLine(leading, "Cook Up", contentStream);
    contentStream.newLineAtOffset(50 - width, -20);
    contentStream.setNonStrokingColor(Color.BLACK);
  }

  private void printTitle(float leading, List<String> titleLines, PDPageContentStream contentStream)
      throws IOException {
    contentStream.setFont(PDType1Font.HELVETICA_BOLD, TITLE_FONT_SIZE);
    printLines(leading, titleLines, contentStream);
    contentStream.newLineAtOffset(0, -1.5F * leading);
  }

  private void printCookingTimeMinutes(float leading, List<String> cookingTimeLines,
      PDPageContentStream contentStream) throws IOException {
    contentStream.setFont(FONT, FONT_SIZE);
    printLines(leading, cookingTimeLines, contentStream);
    contentStream.newLineAtOffset(0, -leading);
  }

  private void printKcal(float leading, List<String> kcalLines,
      PDPageContentStream contentStream) throws IOException {
    contentStream.setFont(FONT, FONT_SIZE);
    printLines(leading, kcalLines, contentStream);
    contentStream.newLineAtOffset(0, -leading);
  }

  private void printServings(float leading, List<String> cookingTimeLines,
      PDPageContentStream contentStream) throws IOException {
    contentStream.setFont(FONT, FONT_SIZE);
    printLines(leading, cookingTimeLines, contentStream);
    contentStream.newLineAtOffset(0, -leading);
  }

  private List<String> getIngredientLines(Recipe recipe) {
    return recipe.getIngredients()
        .stream()
        .flatMap(this::recipeIngredientToString)
        .collect(Collectors.toList());
  }

  private Stream<String> recipeIngredientToString(RecipeIngredient recipeIngredient) {
    String amount = DECIMAL_FORMAT.format(recipeIngredient.getAmount());
    Ingredient ingredient = recipeIngredient.getIngredient();
    String unit = ingredient.getIngredientUnit().name().toLowerCase();
    String name = ingredient.getName();
    String mainIngredientString = "- " + amount + " " + unit + " " + name;
    List<String> substituteLines = getSubstituteLines(recipeIngredient.getSubstitutes());

    return Stream.concat(Stream.of(mainIngredientString), substituteLines.stream());
  }

  private List<String> getSubstituteLines(Set<Ingredient> ingredients) {
    return ingredients.stream()
        .map(this::substituteToString)
        .collect(Collectors.toList());
  }

  private String substituteToString(Ingredient ingredient) {
    String name = ingredient.getName();
    char dot = '\u2022';
    return "  " + dot + " " + name;
  }

  private void printIngredients(float leading, List<String> ingredientsLines,
      PDPageContentStream contentStream) throws IOException {
    contentStream.setFont(FONT, FONT_SIZE);
    printLine(leading, "Ingredients: ", contentStream);
    printLines(leading, ingredientsLines, contentStream);
    contentStream.newLineAtOffset(0, -leading);
  }

  private void printDescription(float leading, List<String> descriptionLines,
      PDPageContentStream contentStream) throws IOException {
    contentStream.setFont(FONT, FONT_SIZE);
    printLine(leading, "Directions: ", contentStream);
    printLines(leading, descriptionLines, contentStream);
  }

  private void printLines(float leading, List<String> descriptionLines,
      PDPageContentStream contentStream) throws IOException {
    for (String line : descriptionLines) {
      printLine(leading, line, contentStream);
    }
  }

  private void printLine(float leading, String line, PDPageContentStream contentStream)
      throws IOException {
    contentStream.showText(line);
    contentStream.newLineAtOffset(0, -leading);
  }

  private List<String> splitToLines(PDFont pdfFont, float fontSize, float width, String text)
      throws IOException {
    text = text.replaceAll("(\r\n)|(\n\r)|(\r)|(\n)", " ");
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
