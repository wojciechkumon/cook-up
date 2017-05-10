package cookup.controller.rest.pdf;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.http.HttpServletResponse;

import cookup.config.RestConfig;
import cookup.service.pdf.PdfGenerator;

@RestController
@RequestMapping(RestConfig.API_BASE_PATH)
public class PdfRestController {
  private final PdfGenerator pdfGenerator;

  public PdfRestController(PdfGenerator pdfGenerator) {
    this.pdfGenerator = pdfGenerator;
  }

  @GetMapping("/recipePdf/{recipeId}.pdf")
  void createRecipePdf(@PathVariable long recipeId, HttpServletResponse response)
      throws IOException {
    byte[] pdfBytes = pdfGenerator.generatePdfBytesForRecipe(recipeId);
    setResponseHeaders(response, recipeId);
    writePdfBytes(response, pdfBytes);
  }

  private void setResponseHeaders(HttpServletResponse response, long recipeId) {
    response.setContentType(MediaType.APPLICATION_PDF_VALUE);
    response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
        "inline; filename=" + "recipe_" + recipeId + ".pdf");
  }

  private void writePdfBytes(HttpServletResponse response, byte[] pdfBytes) throws IOException {
    OutputStream os = response.getOutputStream();
    os.write(pdfBytes);
    os.flush();
    os.close();
  }
}
