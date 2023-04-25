import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GlobalProvider from './utils/globalContext.js';
import NavigationBar from './components/Navbar.js'
import Home from './components/Home.js'
import Categories from './components/Categories.js'
import Favorites from './components/Favorites.js'
import UhOh from './components/UhOh.js'

/*
  Need to get photos from API -- https://unsplash.com/documentation
  Need to sort photos by title EX. Technology, Nature, People and Cars
    -- Make a nav bar that will sort those images
  Design photos with 3 per line going down for as long as it can
  When photo is selected make picture pop up bigger and make the background more opague
    -- Grab selectedImage id
  
*/


export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/category/:id" element={<Categories />} />
          <Route path="*" element={<UhOh />} />
        </Routes>
      </Router>
    </GlobalProvider>
  )
};
