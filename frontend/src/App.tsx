import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/productPage'
import Navbar from './components/navbar';


function App() {
  return(
    <>
     <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/products/:id" element={<ProductPage/>}/>
      </Routes>
    </Router>

    
    </>
  )
}

export default App;