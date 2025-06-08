import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';
import { useState } from 'react';
import ProductPage from './pages/ProductPage/ProductPage.tsx';
import CartPage from './pages/CartPage/CartPage.tsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx';

function App() {
  const [isAuth, setIsAuth] = useState(!!sessionStorage.getItem('isAuth'));

  return (
    <main>
      <Header />

      <Routes>
        <Route path="/login" element={<LoginPage setIsAuth={setIsAuth} />} />
        <Route
          path="/signup"
          element={<RegisterPage setIsAuth={setIsAuth} />}
        />

        <Route path="/" element={<HomePage />} />
        <Route path="/:prodid" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      {isAuth && <Footer />}
    </main>
  );
}

export default App;
