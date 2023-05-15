import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Private from './components/Private';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Product from './components/Product';
import UpdateProduct from './components/UpdateProduct';



function App() {

 
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
     <Routes>

      <Route element={<Private/>} >
      <Route path='/product' element={<Product/>} />
      <Route path='/add' element={<AddProduct/>} />
      <Route path='/update/:id' element={<UpdateProduct/>} />
      <Route path='/profile' element={<h1>update profile</h1>} />
      <Route path='/logout' element={<h1>logout product</h1>} />      
      </Route>

      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      
     
     </Routes>
     <Footer/>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
