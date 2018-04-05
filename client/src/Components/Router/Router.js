import React from 'react';
import {Route, Switch} from 'react-router-dom';
import App from '../App';
import MovieFactory from '../Movie/MovieFactory';
import SignInForm from '../SignIn/SignInForm';
import Movie from '../Movie/movie';



const Router = (props) => (
    <Switch>
      <Route exact path={'/'} render={() => <MovieFactory 
        movies={props.movies} 
        user={props.user} 
        addToFavorites={props.addToFavorites}
        goToMovie={props.goToMovie}
        />
      }/>
      <Route path={'/login'} render={() => <SignInForm getUser={props.getUser}/>
       }/>
       <Route path={`/favorites`} render={() => <MovieFactory 
       movies={props.movies} 
       user={props.user} 
       addToFavorites={props.addToFavorites}
       favorites={props.favorites}
       goToMovie={props.goToMovie}
       />
       }/>
       <Route path={`/movie`} render={() => <Movie 
       movies={props.movies} 
       user={props.user} 
       addToFavorites={props.addToFavorites}
       favorites={props.favorites}
       movie={props.movie}
       />
       }/>
    </Switch>
)




export default Router;