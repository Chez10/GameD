import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (key.trim()) {
      navigate(`/search/${key}`);
    } else {
      navigate("/");
    }
  };
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Search for a game"
          onChange={(e) => setKey(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};
export default Search;
