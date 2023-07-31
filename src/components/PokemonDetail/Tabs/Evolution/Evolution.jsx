import { ArrowForward } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./Evolution.css";

const Evolution = ({ pokemon, name }) => {
  const [pokemonsFamily, setPokemonsFamily] = useState([]);

  const [evolvesPokemon, setEvolvesPokemon] = useState([]);

  const handleNameSpecies = useCallback(
    ({ species, evolves_to, evolution_details }) => {
      let namesPokemons = [
        {
          name: species.name,
          level: 0,
          item: evolution_details[0]?.item?.name,
          held_item: evolution_details[0]?.held_item?.name,
          trigger: evolution_details[0]?.trigger?.name,
          // slice last 5 characters to get the id instead of number because names have hyphens
          id: species.url.slice(-5).replace(/\D/g, "").replaceAll("/", ""),
        },
      ];
      if (evolution_details.length)
        namesPokemons[0].level = evolution_details[0].min_level;

      evolves_to.forEach((evolves) => {
        namesPokemons = namesPokemons.concat(handleNameSpecies(evolves));
      });
      return namesPokemons;
    },
    []
  );

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.data?.id}`)
      .then((responseSpecies) => {
        const url = responseSpecies.data?.evolution_chain?.url;
        axios.get(url).then((responseEvolution) => {
          const species = handleNameSpecies(responseEvolution.data?.chain);
          setPokemonsFamily(species);
        });
      });
  }, [name, handleNameSpecies]);

  useEffect(() => {
    if (pokemonsFamily.length) {
      const urlsAxios = pokemonsFamily.map((p) => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
      });

      Promise.all([...urlsAxios]).then((responses) => {
        const result = responses.map((response, index) => {
          const { id, sprites } = response.data;
          return {
            ...pokemonsFamily[index],
            number: `#${id}`,
            image: sprites.other.home.front_default,
          };
        });
        setEvolvesPokemon(result);
      });
    }
  }, [pokemonsFamily]);

  return (
    <div className="evolution">
      {evolvesPokemon.length
        ? evolvesPokemon.slice(0, 9).map((evolves, index) => (
            <React.Fragment key={evolves.level}>
              {index !== 0 && (
                <div className="evolution-arrow">
                  <ArrowForward color="rgba(0, 0, 0, 0.06)" />
                  {evolves.level && <p>(Level {evolves.level})</p>}
                  {evolves.item && (
                    <img
                      alt={evolves.item}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evolves.item}.png`}
                    />
                  )}
                  {evolves.held_item && (
                    <img
                      alt={evolves.held_item}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${evolves.held_item}.png`}
                    />
                  )}
                  {!evolves.level &&
                    !evolves.item &&
                    !evolves.held_item &&
                    evolves.trigger === "level-up" && <p>(High Friendship)</p>}
                  {evolves.trigger && <p>(Evolves from {evolves.trigger})</p>}
                </div>
              )}
              <div className="evolution-column">
                <NavLink
                  // limitation with api some hyphened names do not work so use id to get entry
                  to={`/${evolves.id}`}
                >
                  <img
                    width={128}
                    height={128}
                    src={evolves.image}
                    alt={`pokemon image ${evolves.name}`}
                  />
                </NavLink>
                <p>{evolves.number}</p>
                <h4>{evolves.name}</h4>
              </div>
            </React.Fragment>
          ))
        : pokemonsFamily.length > 0 &&
          evolvesPokemon.length > 0 && (
            <h1 style={{ textAlign: "center" }}>Loading...</h1>
          )}
    </div>
  );
};
export default Evolution;