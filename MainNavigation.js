import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const cxn=useContext(AuthContext);

    const LogoutHandler=()=>{
      cxn.logout();
    }

//take from the context api
  const isLogin=cxn.isLoggedIn;
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLogin && <li>
            <Link to='/auth'>Login</Link>
          </li>}

          {isLogin && <li>
            <Link to='/profile'>Profile</Link>
          </li> }
          {isLogin && 
          <li>
            <button onClick={LogoutHandler}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
