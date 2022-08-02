import React from "react";
import Nav from "../nav/Nav";
import s from './about.module.css';
import logo from './resources/hangLoose.png';
import github from './resources/github.png';
import linkedin from './resources/linkedin.png';

export default function About(){
    return (
        <>
        <Nav />
        <div className={s.container}>
            <div className={s.about}>
                <div className={s.title}>
                    <img src={logo} alt="logo" />
                </div>
                <div className={s.data}>
                    <p className={s.paragraph}>
                            Welcome to Hang Loose games, a SPA website connected to RAWG.io, the largest video game database with +500k games. Here you can create your own games and show them to everyone.
                            Enjoy!
                    </p>
                    <br />
                    <p className={s.paragraph}>This website has been created using React.js, Redux, node.js and sequelize.</p>
                </div>
                <div className={s.createdby}>
                    <div className={s.creator}>
                        <p>Valentino Machuca</p>
                    </div>
                    <div className={s.social}>
                           <a href="https://github.com/valentino-machuca"><img src={github} alt="github" className={s.item} /></a>
                           <a href="https://www.linkedin.com/in/valentino-machuca"><img src={linkedin} alt="github" className={s.item} /></a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}