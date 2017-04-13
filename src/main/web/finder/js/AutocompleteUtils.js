class AutocompleteUtils {

  static getIngredients() {
    return [
      {id: 1, name: "gooseberry", ingredientUnit: 'GRAM'},
      {id: 2, name: "water-melon", ingredientUnit: 'GRAM'},
      {id: 3, name: "pineapple", ingredientUnit: 'GRAM'},
      {id: 4, name: "avokado", ingredientUnit: 'GRAM'},
      {id: 5, name: "banana", ingredientUnit: 'ML'},
      {id: 6, name: "musli", ingredientUnit: 'GRAM'},
      {id: 7, name: "fries", ingredientUnit: 'GRAM'},
      {id: 8, name: "bean", ingredientUnit: 'GRAM'}
    ];
  }

  static matchIngredientToTerm(state, value) {
    return (
        state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  static sortIngredient(a, b, value) {
    const aLower = a.name.toLowerCase();
    const bLower = b.name.toLowerCase();
    const valueLower = value.toLowerCase();
    const queryPosA = aLower.indexOf(valueLower);
    const queryPosB = bLower.indexOf(valueLower);
    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB;
    }
    return aLower < bLower ? -1 : 1;
  }

  static getIngredientByName(name) {
    return AutocompleteUtils.getIngredients().find(
        product => product.name === name);
  }
}

export default AutocompleteUtils;
