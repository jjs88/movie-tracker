import React, { Component } from 'react';
import Header from './Header/header';
import Router from './Router/Router';
import {routes} from '../helper';
import {getPopularMovies} from '../helper';
import {withRouter} from "react-router-dom";

class App extends Component {

  state = {
    user: null,
    movies: null,
    movie: null,
    favorites: []
  }

  addToFavorites = async (movie) => {
    const exists = this.state.favorites.indexOf(movie);
    // console.log(this.state.user);
    //get copy of state
    const favorites = [...this.state.favorites];
    //doesn't exist
    if(exists === -1) {
      //add to favorites state
      favorites.push(movie);
      this.setState({favorites});
      //add to database for use
      const favorite = {
        movie_id: movie.id,
        user_id: this.state.user.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview
      }

      //add to database
      fetch("/api/users/favorites/new", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(favorite)
        })
        .then(res => res.text())
        .then(data =>  {
          const favID = JSON.parse(data).id;
          console.log(favID);
        })

      return;
    }

    //exists, so remove from state and DB
    await fetch(`/api//users/${this.state.user.id}/favorites/${movie.id}`, {
      method: "DELETE"
      })
      .then(res => res.text())
      .then(data =>  {
        console.log(data);
      })

      const pos = favorites.indexOf(movie);
      favorites.splice(pos,1);
      this.setState({favorites});

  }


  getUser = async (user) => {
    //get favorites if exist
    const favorites = await this.getFavorites(user);
    this.setState({user, favorites});

    //add user to local storage
    localStorage.setItem('currentUser', JSON.stringify(user));

    //go to root page
    this.props.history.push('/');
  }

  logout = () => {
    console.log('logging user out');
    if(this.state.user) {
      const user = null;
      const favorites = null;
      this.setState({user, favorites});
    }
    this.props.history.push('/login');
  }

  getFavorites = async (user) => {
    const res = await fetch(`/api/users/${user.id}/favorites`);
    const data = await res.text();
    const favorites = await JSON.parse(data).data;
    console.log(favorites);
    return favorites;
  }

  loadPopularMovies() {
    getPopularMovies().then(movies => this.setState({movies}));
  }

  goToMovie = (movie) => {
    this.setState({movie});
    this.props.history.push('/movie');

  }

  async componentDidMount() {
    this.loadPopularMovies();
    //add user from local storage
    const user = JSON.parse(localStorage.getItem('currentUser'));
    //get favorites
    console.log('MOUNTED. getting favs...', `/api/users/${user.id}/favorites`);
    const res = await fetch(`/api/users/${user.id}/favorites`);
    const data = await res.text();
    const favorites = await JSON.parse(data).data;
    this.setState({user, favorites});

  }

  render() {
    return (
      <div className="container"> 
        <Header user={this.state.user} logout={this.logout}/>
        <div className="content">
          <Router 
            movies={this.state.movies} 
            getUser={this.getUser} 
            user={this.state.user}
            addToFavorites={this.addToFavorites}
            favorites={this.state.favorites}
            goToMovie={this.goToMovie}
            movie={this.state.movie}
          />
        </div>
      </div>     
    );
  }
}

export default withRouter(App);
