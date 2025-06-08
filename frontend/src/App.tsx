import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx';

function App() {
  return (
    <main>
      <Header />

      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
