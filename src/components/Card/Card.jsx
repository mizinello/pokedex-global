import React from "react";
import { pokemonTypes } from "../../pokemonTypes";
import "./Card.css";

const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          if (item.name) {
            const [{ color }] = pokemonTypes.filter(
              (type) => type?.name === item?.types[0]?.type?.name
            );
            return (
              <>
              <div className="card"
                  key={item.id}
                  onClick={() => infoPokemon(item)}
                  style={{ backgroundColor: `${color}` }}>
                  <div className="card-image">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.id}.png`}
                    height={128}
                    width={128}
                    alt=""
                  />
                </div>
                <div className="card-name">
                  <p>{item.name}</p>
                </div>
              </div>
              <br />
              </>
            );
          }
        })
      )}
    </>
  );
};
export default Card;