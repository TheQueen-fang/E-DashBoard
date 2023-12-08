
import './App.css';
import Footer from './components/Footer.js';
import Nav from './components/Nav.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignUp from './components/SignUp.js';
import PrivateComponent from './components/PrivateComponent.js';

import Login from './components/Login.js';
import AddProduct from './components/AddProduct.js';
import ProductList from './components/ProductList.js';
import UpdateProduct from './components/UpdateProduct.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
         <Nav/>
        <Routes>


          <Route element={<PrivateComponent />}>
            
             <Route path='/' element={<ProductList/>} />

          <Route path='/add' element={<AddProduct/>} />


          <Route path='/update/:id' element={<UpdateProduct/>} />


          <Route path='/logout' element={<h1>Logout </h1>} />


          <Route path='/profile' element={<h1>Profile Page </h1>} />
            
          </Route>

          

          <Route path='/signup' element={<SignUp />} />
          
          <Route path='/login' element={<Login/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
