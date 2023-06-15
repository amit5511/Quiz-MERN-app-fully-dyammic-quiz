import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import { isLogin } from '../../utils/common';
import { logout } from '../../redux/actions/auth';
import { getUser } from '../../redux/actions/auth';
import classes from './Navbar.module.css';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';




const Navbar = () => {
 
  const dispatch = useDispatch();
  const history = useHistory();
  
  const userData = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    dispatch(getUser());
   

  }, []);
  
   
  let links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/attempted', label: 'Attempted' },
    { href: '/all', label: 'All quizzes' },
   
  ];
 if( userData&&userData.role=='admin'){
  links=[...links,
    { href: '/created', label: 'Created' },
    { href: '/create-quiz', label: 'Create quiz' },
    { href: '/leaderboard', label: 'leader-board' }
  ]}
  return (
    <div className={classes.navbar}>
      <a href='/' className={classes.brandName}>
        Qriosity
      </a>
      {!userData? <a href='/auth' className={classes.authButton}>
      Login / Register
    </a>
     :
     <>
      <div className={classes.dropdown}>
      <button className={classes.dropdownButton}>
        <span>Options</span>
        <div className={classes.dropdownContent}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <button
            className={classes.dropdownButton}
            onClick={()=>{
              localStorage.clear();
              window.location.reload(true)
              // <Redirect to="/"/>
            }}
          >
            Logout
          </button>
        </div>
      </button>
    </div>
      </>}
    </div>
  );
};

export default Navbar;
