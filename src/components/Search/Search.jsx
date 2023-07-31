import React, { useEffect, useState } from "react";
import "./Search.css";

const Search = ({ fetchSearch }) => {
  const [search, setSearch] = useState("");

  const searched = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetchSearch(search);
  }, [search]);

  return (
    <input
      className="search-field"
      type="search"
      value={search}
      placeholder="Search Pokemon"
      onChange={(e) => searched(e)}
    ></input>
  );
};
export default Search;