import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../../services/recipe";

const baseUrl = import.meta.env.VITE_API_URL;

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
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  if (isError) return <h1>Error</h1>;

  return (
    <div className="Home">
      <h1>Recipes</h1>
      <div>
        {recipes?.map(({ title, image, dishTypes, id }) => {
          return (
            <Link to={`/recipe/${id}`} key={id}>
              <article>
                <h3>{title}</h3>
                <img src={image} alt={title} />
                <ul>
                  {dishTypes.map((dishType) => (
                    <li key={dishType}>{dishType}</li>
                  ))}
                </ul>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
