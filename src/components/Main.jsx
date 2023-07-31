import React from "react";
import Card from "./Card/Card";
import Pokeinfo from "./Pokeinfo/Pokeinfo";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Search from "./Search/Search";
import Filter from "./Filter/Filter";
import { pokemonTypes } from "../pokemonTypes";
import { Button, Menu, Fade } from "@mui/material";
import { Close } from "@mui/icons-material";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const imgUrl = require(`../assets/pokedex/logo.webp`);

  const [filtered, setFiltered] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const pokeFun = async () => {
    if (pokeData.length > 0) {
      setPokeData([]);
    }
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  const fetchSearch = async (value) => {
    if (value) {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${value}`
        );
        setPokeData((state) => {
          state = [result.data];
          state.sort((a, b) => (a.id > b.id ? 1 : -1));
          return state;
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      if (pokeData.length > 0) {
        setPokeData([]);
        pokeFun();
      }
    }
  };

  const fetchFilter = async (value) => {
    if (value) {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/type/${value}`
        );
        const filteredPokemon = result.data.pokemon;
        filteredPokemon.map(async (item) => {
          if (
            item.pokemon.url
              .slice("-6")
              .replace(/\D/g, "")
              .replaceAll("/", "") < 10000
          ) {
            setPokeData([]);
            const result = await axios.get(item.pokemon.url);
            setPokeData((state) => {
              state = [...state, result.data];
              state.sort((a, b) => (a.id > b.id ? 1 : -1));
              return state;
            });
          }
        });
        setFiltered(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <div className="header">
        <img src={imgUrl} width={300} height={100} alt="logo" />
      </div>
      <div className="search-filter-container">
        <div className="filter-header">
          <div className="side-left"v>
            <Search fetchSearch={fetchSearch} />
            <Button
            className="filter-type"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            variant="contained"
          >
            Filter by Type
          </Button>
          </div>
        </div>



        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <button
            onClick={() => {
              pokeFun();
              handleClose();
              setFiltered(false);
            }}
            className="clear-button"
          >
            <Close fontSize="16" />
            <span>Clear</span>
          </button>
          {pokemonTypes.map(({ name }) => {
            return (
              <Filter
                fetchFilter={fetchFilter}
                type={name}
                handleClose={handleClose}
              />
            );
          })}
        </Menu>
      </div>
      <div className="container">
        <div className="left-content">
          {pokeData.length > 0 && (
            <Card
              key={pokeData.id}
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => setPokeDex(poke)}
            />
          )}
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
      <div className="btn-group">
        {!filtered && (
          <>
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
              	&lt;&ensp;Previous
              </button>
            )}
            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next&ensp;&gt; 
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Main;