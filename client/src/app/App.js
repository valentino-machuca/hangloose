import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from '../components/home/Home';
import Detail from '../components/detail/Detail';
import About from '../components/about/About';
import Landing from '../components/landing/Landing';
import Create from '../components/create/Create';
import NotFound from '../components/404/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing />}/>
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/create' element={<Create/>}/>
        <Route exact path='/game/:id' element={<Detail />}/>
        <Route exact path='/about' element={<About />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
