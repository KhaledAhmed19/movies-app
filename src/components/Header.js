/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();
  return (
    <header
      style={{
        height: "50px",
        width: "800px",
        display: "flex",
        backgroundColor: "black",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <h1 style={{ marginTop: "0", marginLeft: "20px", color: "#ffffff" }}>
          Movies App
        </h1>
      </Link>
      <button
        type="button"
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "16px",
          border: "3px solid gray",
          cursor: "pointer",
        }}
        onClick={() => history.push("/search")}
      >
        Movie Search
      </button>
    </header>
  );
}
