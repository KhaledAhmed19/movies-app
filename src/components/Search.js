import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import Modal from 'react-modal'
import firebase from '../firebase'



export default function Search(){
    const [term, setTerm] = useState('')
    const [current, setCurrent] = useState([])
    const [movie, setMovie] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    Modal.setAppElement('#root')
    var database = firebase.firestore()
   

    useEffect(()=> {
        database.collection("movies").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
    
                setCurrent([...current, doc.data()])
            });
  });
        

      }, [database])

    const onInputChange = event => {
        setTerm(event.target.value)
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const films = await Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=28a7ec6eb0036a0d9a13ad525316f33b&query=${term}`)
    setCurrent(films.data.results.slice(0,2))
    database.collection("movies").add({
    title: films.data.results[0].title ,
    overview: films.data.results[0].overview,
    poster_path: films.data.results[0].poster_path
})

  };
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
        <div className="search-bar ui segment">
        <form onSubmit={onSubmit} className="ui form">
          <div className="field">
            <label>Movie Search</label>
            <input
              type="text"
              value={term}
              onChange={onInputChange}
            />
          </div>
        </form>
      </div>
      {current.length? <div className="ui grid">
            {showFilms}
        </div>: null}
      </div>
    )
}

