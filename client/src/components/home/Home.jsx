import React from "react"; //useEffect para ciclos de vida.
import s from './home.module.css';
import Loader from "../loader/Loader";

//redux
// import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';//Importo useDispatch hook para despachar acciones al store.
                                                      //Importo useSelector para obtener info de la store
import { getGames, getPlatforms, getGenres } from '../../redux/actions'; //Importo las actions creators para el dispatch.
import Pagination from "../pagination/Pagination";
import Filters from "../filters/Filters";
import Nav from "../nav/Nav";

class Home extends React.Component{

    componentDidMount(){
        this.props.getGames();
        if(!this.props.platforms.length || !this.props.genres.length){
            this.props.getPlatforms();
            this.props.getGenres();
        }
    }

    render(){
        return(
            <>
            <Nav/>
                <div className={s.home}>
                {this.props.loading ? <Loader /> : (
                    <>
                    <div className={s.filters}>
                        <Filters />
                    </div>

                    <div className={s.container}>
                        <Pagination games={this.props.games}/>
                    </div>
                    </>
                )
            }
            </div>
            </>
        );
    }
}

function mapStateToProps(state){
    return{
        platforms: state.platforms,
        genres: state.genres,
        games: state.games,
        loading: state.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        getGames : () => dispatch(getGames()),
        getPlatforms : () => dispatch(getPlatforms()),
        getGenres : () => dispatch(getGenres()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


// function Home(){
//     const platforms = useSelector(store => store.platforms);
//     const genres  = useSelector(store => store.genres);
//     const games = useSelector(store => store.games);
//     const loading = useSelector(store => store.loading);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(getGames());
//         if(!platforms.length || !genres.length){
//             dispatch(getPlatforms());
//             dispatch(getGenres());
//         }
//         // eslint-disable-next-line
//     }, []);

    // return(
    //     <>
    //     <Nav/>
    //     <div className={s.home}>
    //         <div className={s.filters}>
    //                 <Filters />
    //         </div>

    //         <div className={s.container}>
    //                 {
    //                     loading ? <Loader /> : <Pagination games={games}/>
    //                 }
    //         </div>
    //     </div>
    //     </>
    // );
// };
