import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../services/recipe";

function Recipe() {
  const [recipeData, setRecipeData] = useState({
    isLoading: true,
    isError: null,
    data: null,
  });
  const { id } = useParams();

  const { isLoading, isError, data: recipe } = recipeData;

  useEffect(() => {
    getRecipe(id)
      .then((res) => {
        setRecipeData({
          isLoading: false,
          isError: null,
          data: res,
        });
      })
      .catch((e) => {
        setRecipeData({
          isLoading: false,
          isError: e,
          data: null,
        });
      });
  }, [id]);

  if (isLoading) return <h1>Loading</h1>;

  if (isError) return <h1>Error</h1>;

  const { title, image, ...rest } = recipe;

  console.log(rest);

  return (
    <div>
      <h1>{title}</h1>
      <img src={image} alt={title} />
    </div>
  );
}

export default Recipe;
