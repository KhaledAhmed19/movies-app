import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Modal from 'react-modal'


export default function Current(){
    const [current, setCurrent] = useState([])
    const [movie, setMovie] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    Modal.setAppElement('#root')
    const loadFilms = async() => {
        const results = await Axios.get('https://api.themoviedb.org/3/discover/movie?api_key=28a7ec6eb0036a0d9a13ad525316f33b&primary_release_date.gte=2021-03-14&primary_release_date.lte=2021-04-14')
        setCurrent(results.data.results.slice(0,5))

    }
    useEffect(()=> {
        loadFilms()

      }, [])
      const viewFilm = (film) => {
          setOpenModal(true)
          setMovie(film)
          
      }
      const showFilms = current.map(film => {
        return (
          <div >
          <div key={film.id} className="ui card " onClick={()=> viewFilm(film)}>
           <img 
        alt={film.title}
        className="ui image"
        src={'https://image.tmdb.org/t/p/w200'+film.poster_path}
        height="150"
        
      />
      </div>
      {movie?
      <Modal isOpen={openModal} onRequestClose={()=> setOpenModal(false)}>
            <h1>Movie Title: {movie.title}</h1>
            <h2>Movie description: {movie.overview}</h2>
            <img 
        alt={movie.title}
        className="ui image"
        src={'https://image.tmdb.org/t/p/w200'+movie.poster_path}
        height="500  "
        width="500"
        
      />
      </Modal>
      : null}
          </div>
          
        );
      });
    return (
        <div>
        <h2>
        <Link to="/search">Search for a movie..</Link>
        </h2>
        <h2>Currently showing: </h2>
        <div className="ui grid">
            {showFilms}
        </div>
        </div>
    )
}