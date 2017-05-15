export const validateDifficultyLevel = values => {
  return values.difficultyLevel && ['EASY', 'MEDIUM', 'HARD'].includes(values.difficultyLevel)
    ? {} : {difficultyLevel: 'Specify difficulty level'}
};

export const validateIngredients = values => {
  console.log(values);
  return {};
};