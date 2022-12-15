const baseUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export function getAllRecipes(number = 1) {
  const URL = `${baseUrl}/recipes/random?number=${number}&apiKey=${apiKey}`;
  return fetch(URL).then((res) => res.json());
}

export function getRecipe(id) {
  const URL = `${baseUrl}/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;
  return fetch(URL).then((res) => res.json());
}
