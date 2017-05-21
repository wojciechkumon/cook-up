package cookup.service.ingredients;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Property;
import org.apache.jena.rdf.model.RDFNode;
import org.apache.jena.rdf.model.SimpleSelector;
import org.apache.jena.rdf.model.Statement;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import cookup.dao.IngredientDao;
import cookup.domain.recipe.Ingredient;

@Service
public class SimilarIngredientsFinderImpl implements SimilarIngredientsFinder {
  private final IngredientDao ingredientDao;
  private final Model model;
  private final Property type;
  private final List<Ingredient> ingredients;

  public SimilarIngredientsFinderImpl(IngredientDao ingredientDao) {
    this.ingredientDao = ingredientDao;
    this.ingredients = new ArrayList<>();
    this.model = ModelFactory.createDefaultModel();
    String ingredientTypeUri = "http://cookup.com/2017/ingredient/type/1.0#";
    this.type = model.createProperty(ingredientTypeUri, "type");
  }

  private void init() {
    ingredients.addAll(ingredientDao.findAll());

    model.createResource("cookup://milk")
        .addProperty(type, "milk");
    model.createResource("cookup://soy_milk")
        .addProperty(type, "milk");
    model.createResource("cookup://hemp_milk")
        .addProperty(type, "milk");
  }

  @Override
  public List<Ingredient> find(Ingredient ingredient) {
    if (ingredients.isEmpty()) {
      init();
    }

    String typeValue = getIngredientTypeValue(ingredient);
    if ("".equals(typeValue)) {
      return Collections.singletonList(ingredient);
    }
    return findIngredientsWithType(typeValue);
  }

  private String getIngredientTypeValue(Ingredient ingredient) {
    String ingredientLocalName = transformSpacesToUnderscores(ingredient.getName());
    String ingredientUri = "cookup://" + ingredientLocalName;

    return Optional.ofNullable(model.getResource(ingredientUri))
        .map(resource -> resource.getProperty(type))
        .map(Statement::getObject)
        .map(RDFNode::toString)
        .orElse("");
  }

  private List<Ingredient> findIngredientsWithType(String typeValue) {
    List<String> strings = new ArrayList<>();
    model
        .listStatements(new SimpleSelector(null, type, typeValue))
        .forEachRemaining(s -> strings.add(s.getSubject().getLocalName()));

    return strings.stream()
        .map(this::transformUnderscoresToSpaces)
        .map(this::toIngredient)
        .collect(Collectors.toList());
  }

  private String transformUnderscoresToSpaces(String localName) {
    return localName.replaceAll("_", " ");
  }

  private String transformSpacesToUnderscores(String localName) {
    return localName.replaceAll(" ", "_");
  }

  private Ingredient toIngredient(String name) {
    return ingredients.stream()
        .filter(i -> i.getName().equals(name))
        .findFirst()
        .orElseThrow(() -> new IllegalArgumentException("ingredient not found: " + name));
  }
}
