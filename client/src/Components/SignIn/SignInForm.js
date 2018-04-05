import React from 'react';

const SignInForm = (props) => {

  const clickSignIn = (e) => {
    e.preventDefault();

    //simple validation check. will need improvement
    if(!this.email.value || !this.password.value) return;

    const email = this.email.value;
    const password = this.password.value;
    const user = {
      email,
      password
    }

    fetchUser(user);
  }

  const fetchUser = async (user) => {
    const res = await  fetch("/api/users", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(user)
    });

    const data = await res.text();
    const usr = await JSON.parse(data).data;

    console.log('got the user', usr);

    // fetchFavorites(usr);
    props.getUser(usr);
    
  }





  return (
    <form className="signInForm" onSubmit={clickSignIn}>
      <input className="signInForm__Item" type="text" placeholder="email" ref={(input) => { this.email = input;}}/>
      <input className="signInForm__Item" type="password" placeholder="password" ref={(input) => { this.password = input;}}/>
      <button className="signInForm__Item" type='submit'>login</button>
    </form>
  )
}

export default SignInForm;

