import React from 'react';
import Movie from './movie';
import {withRouter} from "react-router-dom";

const MovieFactory = (props) => {

const renderMovies = () => {
  //all movies
  return (
  <div className='movies'>
      {props.movies ? props.movies.map((movie,index) => <Movie 
      key={index} 
      movie={movie} 
      user={props.user}
      addToFavorites={props.addToFavorites}
      goToMovie={props.goToMovie}
      />)
      : <p>nothing</p>}
    </div>
  )
}

const renderFavorites = () => {
  //filter for favorite movies
  return (
    <div className='movies'>
      {props.favorites ? props.favorites.map((movie,index) => <Movie 
      key={index} 
      movie={movie} 
      user={props.user}
      addToFavorites={props.addToFavorites}
      goToMovie={props.goToMovie}
      />)
      : <p>no favorites</p>}
    </div>
  )
}

  return (
    props.location.pathname === '/favorites' ? renderFavorites(): renderMovies()
  )
}

export default withRouter(MovieFactory);