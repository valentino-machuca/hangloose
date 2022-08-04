//React y estilos
import React, { useState } from 'react'
import s from './create.module.css';
import img_create from './resources/img.jpg'

//Nav
import Nav from '../nav/Nav';

//action createGame
import { createGame, createStatus } from '../../redux/actions';

//useSelector para conocer los generos y plataformas de redux :)
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Create = () => {
    const dispatch = useDispatch();
    const status = useSelector(store => store.createStatus);
    const genres = useSelector(store => store.genres);
    const platforms = useSelector(store => store.platforms);

    /*Para reiniciar el estado creacion cada vez que inicia*/
    useEffect(() => {
        dispatch(createStatus(''));
    }, [dispatch]);

    const [errors, setError] = useState({ /*Estado para manejo de errores*/
        name: '',
        publisher: '',
        description: '',
        rating: '',
        allowed: false,
    });

    const [form, setForm] = useState({  /*Estado de mi form controlado*/
        name: '',
        publisher: '',
        release: '',
        description: '',
        cover: '',
        rating: 0,
        genres: [],
        platforms: [],
    });

    const handleValidate = (e) => { //Evito nulls y caracteres no deseados.
        if(e.target.name === 'name'){
            if(!e.target.value){
                setError({...errors, [e.target.name]: 'Required', allowed:false});
            }else{
                /^[\w\d\s-:]+$/gi.test(e.target.value) ? setError({...errors, [e.target.name]: '', allowed:true}) : setError({...errors, [e.target.name]: 'Use letters, numbers or dashes', allowed:false});
            }
        }else if(e.target.name === 'publisher'){
            if(!e.target.value){
                setError({...errors, [e.target.name]: 'Required', allowed:false});
            }else{
                /^[\w\s]+$/gi.test(e.target.value) ? setError({...errors, [e.target.name]: '', allowed:true}) : setError({...errors, [e.target.name]: 'Use letters or numbers', allowed: false});
            }
        }else{
            if(!e.target.value){
                setError({...errors, [e.target.name]: 'Required', allowed:false});
            }else{
                setError({...errors, [e.target.name]: '', allowed:true});
            }
        }

        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleChange = (e) => {
        if(e.target.type === 'checkbox'){ //handleChange para checkbox
            if(e.target.checked){ //si se checkea un checkbox se agrega su id al arreglo de su estado
                setForm({
                    ...form,
                    [e.target.name]: [...form[e.target.name], Number(e.target.value)]
                })
            }else{
                setForm({ //si se quita el check lo elimina
                    ...form,
                    [e.target.name]: form[e.target.name].filter(d => d !== Number(e.target.value)),
                })
            }
        }else{
            setForm({ //handleChange para inputs que no se validan.
                ...form,
                [e.target.name]:e.target.value,
            });
        }
    }

    const handleSubmit = (e) => { //Al submitear se despacha y se limpia
        e.preventDefault();
        dispatch(createGame(form));
        setForm({
            name: '',
            publisher: '',
            release: '',
            description: '',
            cover: '',
            rating: 0,
            genres: [],
            platforms: [],
        });
    }


  return (
    <>
    <Nav/> {/* nav component */}
    <div className={s.container}>
    <div className={s.create}>
            <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
                <h4>Create game</h4>
                <div className={s.inputs}>
                    <div className={s.grid}>
                        <div className={s.input}>
                            <label>Name</label>
                            <input type="text" value={form.name} placeholder='Game name' name='name' onChange={e => handleValidate(e)}/>
                            {errors.name ? <p className={s.error}>{errors.name}</p> : ''}
                        </div>
                        <div className={s.input}>
                            <label>Publisher</label>
                            <input type="text" value={form.publisher}  placeholder='Publisher' name='publisher' onChange={e => handleValidate(e)}/>
                            {errors.publisher ? <p className={s.error}>{errors.publisher}</p> : ''}
                        </div>
                    </div>

                    <div className={s.input}>
                        <label>Release</label>
                        <input type="date" value={form.release} placeholder='Release Date' name='release' onChange={e => handleChange(e)}/>
                    </div>

                    <div className={s.inputDescription}>
                        <label>Description</label>
                        <textarea type="text" value={form.description} placeholder='Description' name='description' onChange={e => handleValidate(e)}/>
                        {errors.description ? <p className={s.error}>{errors.description}</p> : ''}
                    </div>

                    <div className={s.grid}>
                    <div className={s.input}>
                        <label>Image</label>
                        <input type="url" value={form.cover} placeholder='Image Url' name='cover' onChange={e => handleChange(e)}/>
                    </div>

                    <div className={s.input}>
                        <label>Rating</label>
                        <input type="number" value={form.rating} step="0.01" min='0' max='5' placeholder='Rating' className={s.rating} name='rating' onChange={e => handleValidate(e)}/>
                        {errors.rating ? <p className={s.error}>{errors.rating}</p> : ''}
                    </div>
                    </div>

                    <div className={s.dynamic}>
                        <div className={s.genres}>
                        <label>Genres</label>
                            <div className={s.checkboxes}>
                                {genres.map((g, idx) => {
                                    return (
                                            <label key={idx+'g'}>
                                                <input type='checkbox' value={g.id}  onChange={e => handleChange(e)} name='genres'/>
                                                {g.name}
                                            </label>
                                        )
                                    })}
                            </div>
                        </div>

                        <div className={s.platforms}>
                        <label>Platforms</label>
                            <div className={s.checkboxes}>
                                {platforms.map((p, idx) => {
                                    return (
                                            <label key={idx+'p'}>
                                                <input type='checkbox' value={p.id}  onChange={e => handleChange(e)} name='platforms'/>
                                                {p.name}
                                            </label>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <input type="submit" value='Create' className={s.submit} disabled={(form.name && form.publisher && form.description && form.rating) ? !errors.allowed : true}/>
                {status ? <p className={s.status}>&#128172;{status}</p> : <p></p>}
            </form>
            <img src={img_create} alt="img_create" className={s.image}/>
    </div>
    </div>
    </>
  )
}

export default Create;