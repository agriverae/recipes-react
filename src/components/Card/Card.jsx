const Card = ({ title, image, dishTypes }) => {
  return (
    <article className="card">
      <h3>{title}</h3>
      <img className="image" src={image} alt={title} />
      <ul className="container-chips">
        {dishTypes.map((dishType) => (
          <li className="chip" key={dishType}>
            {dishType}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default Card;
