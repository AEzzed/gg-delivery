import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';

function App() {
  return (
    <main>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
