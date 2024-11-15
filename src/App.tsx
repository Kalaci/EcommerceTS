
import './App.css'

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from 'react-router';
import {ReceiptProvider } from './context/ReceiptProvider';
import Homepage from './pages/Homepage';
import NavBar from './components/navBar/NavBar';
import ProductPage from './pages/ProductPage';
import Receipt from './pages/Receipt';
import PurchaseHistory from './pages/PurchaseHistory';
import AddProduct from './pages/AddProduct';


function App() {
  return (
    <>
      <BrowserRouter>
      <ReceiptProvider>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/cart' element={<Receipt/>}/>
          <Route path='/purchase-history' element={<PurchaseHistory/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
          <Route path='/edit-product/:id' element={<AddProduct/>}/>
        </Routes>
        </ReceiptProvider>
      </BrowserRouter>
    </>
  )
}

export default App