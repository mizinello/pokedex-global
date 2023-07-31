import React, { useEffect, useState } from "react";
import { pokemonTypes } from "../../pokemonTypes";
import "./Filter.css";

const Filter = ({ fetchFilter, type, handleClose }) => {
  const [{ name, color }] = pokemonTypes.filter((item) => item.name === type);

  const imgUrl = require(`/src/assets/pokemonTypes/${name}.svg`);

  return (
    <button
      className="filter-button"
      onClick={() => {
        handleClose();
        fetchFilter(`${name}`);
      }}
      style={{ backgroundColor: `${color}` }}
    >
      <img src={imgUrl} width={16} height={16} alt={name} color={color} />
      {name}
    </button>
  );
};
export default Filter;