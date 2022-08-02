import React from 'react';
import { Link } from 'react-router-dom';
import s from './landing.module.css';
import logo from './resources/hangLoose.png';

const Landing = () => {
  return (
    <div className={s.container}>
        <div className={s.home}>
            <div className={s.logo}>
                <img src={logo} alt="logo" />
            </div>
            <Link to='/home' className={s.link}>START</Link>
        </div>
    </div>
  )
}

export default Landing