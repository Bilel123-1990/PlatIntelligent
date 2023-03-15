
import './App.css';
import Header from './header/Header';
import Main from './main/Main';
import Footer from './footer/Footer';
//import {  BrowserRouter as Routes, Route} from "react-router-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Acceuil from './Acceuil';
import Blog from './Blog';
import Contact from './Contact';
import Chart from './main/Chart'


function App() {
  return (
    <div className="App">

            <Header />
            {/* <Routes>
          <Route exact path="/acceuil" element={<Acceuil/>} />
          <Route exact path="/blog" element={<Blog/>} />
          <Route exact path="/contact" element={<Contact/>} />     
            </Routes> */}

            {/* <Routes>
              <Route exact path='/chart' component={<Chart/>}/>
            </Routes> */}
{/* 
<Routes>
  <Route exact path="/chart" element={<Chart/>} />
</Routes> */}

             <Main />
            <Footer />
    
    </div>
  );
}

export default App;
