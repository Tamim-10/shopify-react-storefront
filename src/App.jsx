import Home from './pages/Home'  
import ProductPage from './pages/ProductPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'; 
import NavMenu from './components/NavMenu';
import Cart from './components/Cart';
import Footer from './components/ui/Footer';
import AboutUs from './pages/AboutUs';
 
function App() {

  return ( 
    <>
      <NavBar/>
      <NavMenu/>
      <Cart/> 
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/products/:handle" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      <Footer/>
    </>
  )
} 

export default App
