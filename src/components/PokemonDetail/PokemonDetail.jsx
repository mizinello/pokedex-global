import React, { useState, useEffect, useMemo } from "react";
import { pokemonTypes } from "../../pokemonTypes";
import { pokemonDetailColors } from "../../pokemonDetailColors";
import { NavLink, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import "./PokemonDetail.css";
import About from "./Tabs/About/About";
import Stats from "./Tabs/Stats/Stats";
import Evolution from "./Tabs/Evolution/Evolution";
import Pokeball from "../../assets/3.svg";
import { IconButton, Tooltip } from "@mui/material";

const PokemonDetail = () => {
  const [pokemon, setPokemonData] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});

  const [nameSectionActive, setNameSectionActive] = useState("about");
  const [currentColor, setCurrentColor] = useState("");
  const { category } = useParams();


  useEffect(() => {
    const callFetch = async () => {
      const pokemonData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${category}`
      );
      setPokemonData(pokemonData);
    };

    const callFetchSpecies = async () => {
      const pokemonSpeciesData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${category}`
      );
      setPokemonSpecies(pokemonSpeciesData);
    };

    callFetch().catch(console.error);
    callFetchSpecies().catch(console.error);
  }, [category]);

  useEffect(() => {
    if (pokemon.data?.types[0]?.type?.name) {
      const [{ color }] = pokemonDetailColors.filter(
        (item) => item.name === pokemon.data?.types[0]?.type?.name
      );
      setCurrentColor(color);
    }
  }, [pokemon.data?.types]);

  const screenSelected = useMemo(() => {
    switch (nameSectionActive) {
      case "about":
        return (
          <About
            pokemon={pokemon}
            pokemonSpecies={pokemonSpecies}
            currentColor={currentColor}
          />
        );
      case "stats":
        return (
          <Stats stats={pokemon.data?.stats} currentColor={currentColor} />
        );
      case "evolution":
        return <Evolution pokemon={pokemon} name={pokemon.data?.name} />;
      default:
        return <></>;
    }
  }, [nameSectionActive, currentColor, pokemon, pokemonSpecies]);

  return (
    <>
      <div className="pokemon-detail" style={{ background: `${currentColor}` }}>
        <NavLink to="/">
          <Tooltip title="Back">
            <ArrowBackIosIcon className="back-button" fontSize="large" />
          </Tooltip>
        </NavLink>
        <div className="pokemon-info">

            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.data?.id}.png`}
              alt=""
              height="400"
              width="400"
            />

          <div className="pokemon-detail-number">#{pokemon.data?.id}</div>
          <div className="pokemon-detail-name">{pokemon.data?.name}</div>
          <div className="abilities">
            {pokemon.data?.types.map((poke) => {
              const [{ name, color }] = pokemonTypes.filter(
                (item) => item.name === poke.type.name
              );

              const imgUrl = require(`/src/assets/pokemonTypes/${name}.svg`);
              return (
                <>
                  <div className="type" style={{ backgroundColor: `${color}` }}>
                    <img
                      src={imgUrl}
                      width={16}
                      height={16}
                      alt={name}
                      color={color}
                    />
                    <span>{poke.type.name}</span>
                  </div>
                </>
              );
            })}
          </div>
          <div className="abilities">
            {pokemon.data?.abilities.map((item) => {
              return <h2 className="group">{item.ability?.name}</h2>;
            })}
          </div>
          <div className="pokemon-description">
            {["about", "stats", "evolution"].map((nameSection) => (
              <button
                key={nameSection}
                type="button"
                onClick={() => setNameSectionActive(nameSection)}
                active={nameSection === nameSectionActive}
                className="tab-button"
              >
                {nameSection === "evolution" &&
                pokemonSpecies.data?.evolution_chain === undefined ? (
                  <></>
                ) : (
                  nameSection
                )}
                {nameSection === nameSectionActive && (
                  <img className="pokeball" src={Pokeball} alt="" />
                )}
              </button>
            ))}
          </div>
          <div className="active-screen">{screenSelected}</div>
        </div>
      </div>
    </>
  );
};
export default PokemonDetail;