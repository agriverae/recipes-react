import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../services/recipe";
//import recepies from "../../services/recepies.json";
import Card from "../Card";

function Home() {
  const [recipesData, setRecipesData] = useState({
    isLoading: true,
    isError: null,
    data: null,
  });

  const { isLoading, isError, data: recipes } = recipesData;

  useEffect(() => {
    getAllRecipes(20)
      .then((res) => {
        console.log(res);
        setRecipesData({
          isLoading: false,
          isError: null,
          data: res.recipes,
        });
      })
      .catch((e) => {
        setRecipesData({
          isLoading: false,
          isError: e,
          data: null,
        });
      });

    //Data hardcodeada
    /*setRecipesData({
      isLoading: false,
      isError: null,
      data: recepies.recipes,
    });*/
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  if (isError) return <h1>Error</h1>;

  return (
    <div className="home">
      <h1>Recipes</h1>
      <div className="container-card">
        {recipes?.map(({ title, image, dishTypes, id }) => {
          return (
            <Link to={`/recipe/${id}`} key={id}>
              <Card title={title} image={image} dishTypes={dishTypes} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
