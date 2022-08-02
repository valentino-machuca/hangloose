import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import Nav from '../nav/Nav';
import s from './notfound.module.css';

const NotFound = () => {
    const [attribute, setAttribute] = useState({
        left: 0,
        top: 0,
    })

    useEffect(() =>{
        document.addEventListener('mousemove', (e) => {
            setAttribute({left: e.pageX, top: e.pageY});
        });
        return () => {setAttribute({})}
    }, []);

  return (
    <>
    <Nav/>
    <div className={s.container}>
        <div className={s.text}>
            <h1>404</h1>
            <p>Page not found</p>
        </div>
        <div style={{left: attribute.left, top: attribute.top}} className={s.torch}></div>
    </div>
    </>
  )

}

export default NotFound;