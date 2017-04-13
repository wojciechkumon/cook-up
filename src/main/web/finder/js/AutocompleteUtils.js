class AutocompleteUtils {

  static matchIngredientToTerm(state, value) {
    return state.name.toLowerCase().includes(value.toLowerCase());
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
}

export default AutocompleteUtils;
