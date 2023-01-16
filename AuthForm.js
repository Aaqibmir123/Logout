import { useContext, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';
import classes from './AuthForm.module.css';

const AuthForm = () => {

  const emialInput = useRef();
  const passwordInput = useRef();
  const cxn = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const history=useHistory();

  const SubmitHandler = (e) => {
    e.preventDefault();
    //extract the value of from inputs usimg 

    const enterEmil = emialInput.current.value;
    const enterPassword = passwordInput.current.value;

    setLoading(true);
    //validation 
    let url;
    if (isLogin) {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB99sjqsYiisTvfmZva93G51YFHvdyoJUg";
    }
    else {
      url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB99sjqsYiisTvfmZva93G51YFHvdyoJUg";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enterEmil,
        password: enterPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json"
      },

    }
    ).then(res => {
      if (res.ok) {
        setLoading(false);
        return res.json();
      }
      else {
        res.json().then(data => {
          let ErrorMessage = "autn needed";
          if (data && data.error && data.error.message) {

            //data.error.message comes from the firebase
            ErrorMessage = data.error.message;

          }
          alert(ErrorMessage);
          // throw new Error(ErrorMessage);
        })
      }
    }).then((data) => {
      // console.log(data);
      cxn.login(data.idToken);
      history.replace("/");
    }).catch((error) => { console.log(error.message) })


  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emialInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInput} />
        </div>
        <div className={classes.actions}>
          {/* //if not loading show the login */}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {/* //if loading is tue than show the message */}
          {isLoading && <h1>Loading....</h1>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
