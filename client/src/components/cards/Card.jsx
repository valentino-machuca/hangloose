import {React, Component} from "react";
import { Link } from "react-router-dom"; //Link para mas detalles

//Estilos y resources
import s from './card.module.css';
import noImage from './resources/noImage.png'


class Card extends Component{

    render(){
        return(
            <div className={s.card}>
                <Link to={this.props.isDb ? `/game/db_${this.props.id}` : `/game/${this.props.id}`} className={s.link}> {/*Link para más detalles*/}
                <div className={s.image}>
                    {this.props.image ? <img src={this.props.image} alt='game'/> : <img src={noImage} alt='game'/>}
                </div>
                <div className={s.info}>
                    <div className={s.name} >
                        <h4 title='name'>{this.props.name}</h4>
                    </div>
                    <div className={s.platforms}>
                        {this.props.platforms.map((platform, idx) => <p key={idx}>{platform}</p>)}
                    </div>
                    <div className={s.genres}>
                        {this.props.genres.map((genre, idx) => <p key={idx}>{genre}</p>)}
                    </div>
                </div>
                </Link>
            </div>
        );
    }
}

// function Card({name, image, platforms, genres, id, isDb}){

//     return(
//         <div className={s.card}>
//             <Link to={isDb ? `/game/db_${id}` : `/game/${id}`} className={s.link}> {/*Link para más detalles*/}
//             <div className={s.image}>
//                 {image ? <img src={image} alt='game'/> : <img src={noImage} alt='game'/>}
//             </div>
//             <div className={s.info}>
//                 <div className={s.name} >
//                     <h4 title='name'>{name}</h4>
//                 </div>
//                 <div className={s.platforms}>
//                     {platforms.map((platform, idx) => <p key={idx}>{platform}</p>)}
//                 </div>
//                 <div className={s.genres}>
//                     {genres.map((genre, idx) => <p key={idx}>{genre}</p>)}
//                 </div>
//             </div>
//             </Link>
//         </div>
//     );
// };

export default Card;