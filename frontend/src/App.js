import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import BasketPage from './pages/BasketPage';

const App = () => {
  return (
    <Router>
      <Header />

      <main className='py-3'>
        <Container>
          <Route path='/' exact component={HomePage} />
          <Route path='/landing' exact component={LandingPage} />

          <Route path='/product/:id' component={ProductPage} />
          <Route path='/basket/:id?' component={BasketPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
