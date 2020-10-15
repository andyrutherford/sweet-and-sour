import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProductPage from './pages/ProductPage';
import BasketPage from './pages/BasketPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

// Admin pages
import UserListPage from './pages/UserListPage';

const App = () => {
  return (
    <Router>
      <Header />

      <main className='py-3'>
        <Container>
          <Route path='/' exact component={HomePage} />
          <Route path='/page/:pageNumber' exact component={HomePage} />
          <Route path='/search/:query' exact component={HomePage} />
          <Route
            path='/search/:query/page/:pageNumber'
            exact
            component={HomePage}
          />
          <Route path='/landing' exact component={LandingPage} />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/signup' exact component={SignupPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/shipping' component={ShippingPage} />
          <Route path='/payment' component={PaymentPage} />
          <Route path='/place-order' component={PlaceOrderPage} />
          <Route path='/order/:id' component={OrderPage} />
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/basket/:id?' component={BasketPage} />
          <Route path='/admin/users' exact component={UserListPage} />
          <Route path='/admin/users/:id/edit' component={UserEditPage} />
          <Route path='/admin/products/' exact component={ProductListPage} />
          <Route
            path='/admin/products/:pageNumber'
            exact
            component={ProductListPage}
          />
          <Route path='/admin/products/:id/edit' component={ProductEditPage} />
          <Route path='/admin/orders/' exact component={OrderListPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
