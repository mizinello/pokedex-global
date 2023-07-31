import { Search } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { pokemonTypes } from "../../pokemonTypes";
import { NavLink } from "react-router-dom";

import "./Pokeinfo.css";

const Pokeinfo = ({ data, infoPokemon }) => {
  const statsContent = [
    { title: "HP", field: "hp" },
    { title: "Attack", field: "attack" },
    { title: "Defense", field: "defense" },
    { title: "Special Attack", field: "specialAttack" },
    { title: "Special Defense", field: "specialDefense" },
    { title: "Speed", field: "speed" },
  ];

  console.log(data);

  return (
    <>
      {!data ? (
        ""
      ) : (
        <div className="info-card">
          <h1 className="info-name">{data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`}
            alt=""
            height={160}
          />
          <div className="abilities">
            {data.types.map((poke) => {
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
            {data?.abilities.map((item) => {
              return <h2 className="group">{item.ability?.name}</h2>;
            })}
          </div>
          <div className="base-stat">
            {statsContent &&
              statsContent.map((stat, index) => (
                <div className="row" key={stat.field}>
                  <strong>{stat.title}</strong>
                  <span>{data?.stats[index].base_stat || 1}</span>
                </div>
              ))}
          </div>

            <div className="detail-footer">   
              <NavLink
              key={`${data.name}-link`}
              style={{ textDecoration: "none" }}
              to={data.name && `/${data.name}`}
            >
              <Button variant="contained" className="view-more">
                View Detail
              </Button>
            </NavLink>
            </div>
            <div>
            <a href="/" target="_self" rel="noopener noreferrer">
            <Button variant="outlined" color="error">
              Close
            </Button>
              </a>
            </div>

        </div>
      )}
    </>
  );
};
export default Pokeinfo;