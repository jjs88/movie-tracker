import React from 'react';

class Movie extends React.Component {

  state = {
    isfavorite: false
  }

  addFavorite = () => {
    if(!this.props.user) return;
    console.log('add fav');
    //go to app component and add to fav state
    this.props.addToFavorites(this.props.movie);
    const isfavorite = this.state.isfavorite ? false:true;
    this.setState({isfavorite});
  }

  toggleActiveHeart = () => {
    return (
      this.state.isfavorite ? 'far fa-heart fa-2x favorite isFavorite': 'far fa-heart fa-2x favorite'
    )
  }

  clickMovie = () => {
    console.log('movie clicked', this.props.movie.title);
    this.props.goToMovie(this.props.movie);

    //
  }

  render() {
    return (
      <div className="movie">
        <h2>{this.props.movie.title}</h2>
        <img className="movie__poster" onClick={this.clickMovie} src={this.props.movie.poster_path} alt=''/>
        <div onClick={this.addFavorite} className={this.state.isfavorite ? 'isFavorite': null}>
          <span className="far fa-heart fa-2x favorite"></span>
        </div>
      </div>
    )
  }
}

export default Movie; 