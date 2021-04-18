/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "react-modal";
import firebase from "../firebase";

export default function Search() {
  const database = firebase.firestore();
  const [term, setTerm] = useState("");
  const [current, setCurrent] = useState([]);
  const [movie, setMovie] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  Modal.setAppElement("#root");

  useEffect(() => {
    database
      .collection("movies")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCurrent((current) => [...current, doc.data()]);
        });
      });
  }, [database]);

  const onInputChange = (event) => {
    setTerm(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const films = await Axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=28a7ec6eb0036a0d9a13ad525316f33b&query=${term}`
    );
    setCurrent(films.data.results.slice(0, 4));
    database.collection("movies").add({
      title: films.data.results[0].title,
      overview: films.data.results[0].overview,
      poster_path: films.data.results[0].poster_path,
    });
  };
  const viewFilm = (film) => {
    setOpenModal(true);
    setMovie(film);
  };
  // eslint-disable-next-line arrow-body-style
  const showFilms = current.map((film) => {
    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <div>
        <div
          key={film.id}
          onClick={() => viewFilm(film)}
          style={{ cursor: "pointer" }}
        >
          <img
            alt={film.title}
            src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
            height="300"
          />
        </div>
        {movie ? (
          <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)}>
            <div
              className="bg-gradient-to-r from-gray-200 via-yellow-100 ..."
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>{movie.title}</h1>
              <h4>{movie.overview}</h4>
              <img
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                height="400px"
                width="400px"
              />
            </div>
          </Modal>
        ) : null}
      </div>
    );
  });

  return (
    <div>
      <div
        style={{
          margin: "10px",
        }}
      >
        <form onSubmit={onSubmit}>
          <label style={{ fontSize: "20px" }}>Search..</label>
          <input
            style={{
              width: "200px",
              maxWidth: "200px",
              display: "inline-block",
              boxSizing: "border-box",
              padding: "6px",
              borderRadius: "3",
            }}
            type="text"
            value={term}
            onChange={onInputChange}
            placeholder="Type movie name.."
          />
        </form>
      </div>
      {current.length ? (
        <div className="grid grid-flow-col grid-rows-2">{showFilms}</div>
      ) : null}
    </div>
  );
}
