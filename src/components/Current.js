/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Axios from "axios";
import Modal from "react-modal";
import { fetchCurrent, selectMovie, setModal } from "../actions";

export default function Current() {
  // const [current, setCurrent] = useState([]);
  // const [movie, setMovie] = useState(null);
  // const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  Modal.setAppElement("#root");
  /* const loadFilms = async () => {
    const results = await Axios.get(
      "https://api.themoviedb.org/3/discover/movie?api_key=28a7ec6eb0036a0d9a13ad525316f33b&primary_release_date.gte=2021-03-14&primary_release_date.lte=2021-04-14"
    );
    setCurrent(results.data.results.slice(0, 5));
  };  */
  useEffect(() => {
    // loadFilms();
    dispatch(fetchCurrent());
  }, []);
  /* const viewFilm = (film) => {
    setOpenModal(true);
    setMovie(film);
  }; */

  const current = useSelector((state) => state.current);
  const selected = useSelector((state) => state.selected);
  const modal = useSelector((state) => state.modal);

  // eslint-disable-next-line arrow-body-style
  const showFilms = current.map((film) => {
    return (
      <div>
        <div
          key={film.id}
          onClick={() => dispatch(selectMovie(film))}
          style={{ cursor: "pointer" }}
        >
          <img
            alt={film.title}
            src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
            height="300"
          />
        </div>
        {selected ? (
          <Modal
            isOpen={modal}
            onRequestClose={() => dispatch(setModal(false))}
          >
            <div
              className="bg-gradient-to-r from-gray-200 via-yellow-100 ..."
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>{selected.title}</h1>
              <h4>{selected.overview}</h4>
              <img
                alt={selected.title}
                src={`https://image.tmdb.org/t/p/w200${selected.poster_path}`}
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
      <h1>Currently showing: </h1>
      <div className="grid grid-flow-col">{showFilms}</div>
    </div>
  );
}
