import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../services/recipe";
//import recepieDetail from "../../services/recepieDetail.json";

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

    //Data hardcodeada
    /* 
    setRecipeData({
      isLoading: false,
      isError: null,
      data: recepieDetail,
    });
    */
  }, [id]);

  if (isLoading) return <h1>Loading</h1>;

  if (isError) return <h1>Error</h1>;

  const {
    title,
    image,
    dishTypes,
    extendedIngredients,
    analyzedInstructions,
    ...rest
  } = recipe;
  return (
    <div className="recepie-detail">
      <h1>{title}</h1>
      <img src={image} alt={title} />
      {dishTypes && (
        <ul className="container-chips">
          {dishTypes?.map((dishType) => (
            <li className="chip" key={dishType}>
              {dishType}
            </li>
          ))}
        </ul>
      )}
      <h3>Ingredients:</h3>
      <ul className="ingrendients">
        {extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.originalName}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <ol className="instructions">
        {analyzedInstructions[0].steps.map((instruction) => (
          <li key={instruction.number}>{instruction.step}</li>
        ))}
      </ol>
    </div>
  );
}

export default Recipe;
