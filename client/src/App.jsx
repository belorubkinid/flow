import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main";
import Login from './components/User/Login/Login';
import Remind from './components/User/Remind/Remind';
import Footer from './components/Footer/Footer';
import Signup from './components/User/Signup/Signup';
import Categories from './components/Categories/Categories';
import Cart from  './components/Cart/Cart'
import Category from './components/Category/Category'
import Profile from './components/User/Profile/Profile'
import Order from './components/Order/Order';
import CardPage from './components/CardPage/CardPage';
import { useEffect } from 'react';
import axios from 'axios'
import { login } from './redux/actionCreate/userActionCreate';
import { useDispatch, useSelector } from 'react-redux';
import AdminBoard from './components/Admin/AdminBoard/AdminBoard';
import About from './components/About/About'
import './App.css'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    axios(`${process.env.REACT_APP_SERVER_URL}/access`,{
      withCredentials: true,
    })
    .then(({ data }) => {
      dispatch(login(data))
    })
  }, [dispatch]);

  const { user } = useSelector((state) => state);

  return (
    <BrowserRouter>

      <header>
        <Nav />
      </header>
        <main>
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/remind" element={<Remind />}/>
            <Route path="/categories" element={<Categories />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/categories/:id" element={<Category />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/order" element={<Order user={user}/>}/>
            <Route path="/card/:id" element={<CardPage />}/>
            <Route path="/adminboard" element={<AdminBoard />}/>
            <Route path="/about" element={<About />}/>
          </Routes>
        </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
