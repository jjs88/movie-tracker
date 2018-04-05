import React from 'react';
import { NavLink } from 'react-router-dom'


class Header extends React.Component {

  logoutUser = () => {
    console.log('works');
    this.props.logout();
  }

  renderLogin = () => {
    if(!this.props.user) {
      return (
        <NavLink  to={'/login'} activeClassName="activeLink">
         <button className="header-nav__item">Login</button>
        </NavLink>
      )
    }

    return (
      <div>
        <NavLink to={`/favorites`}>
          <button className="header-nav__item fav-btn">Favorites</button>
        </NavLink>       
        <button onClick={this.logoutUser} className="header-nav__item">Logout</button>
      </div> 
    )
  }

  render () {
    return (
      <header className="header">
      <h1 className="header__title">Movie Tracker</h1>
      <div className="header-nav">
        <NavLink  to={`/`} activeClassName="activeLink">
          <button className="header-nav__item">Home</button>
        </NavLink>
        {this.renderLogin()}
      </div>
     
    </header>
    )
  }
}

export default Header;