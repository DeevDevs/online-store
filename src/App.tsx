import React from 'react';
import { Provider } from 'react-redux';
import { appStore } from './store';
import { Route, Routes, Navigate } from 'react-router-dom';
import AboutProduct from './pages/aboutProduct/AboutProduct';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';
import Store from './pages/store/Store';
import Wrapper from './components/wrapper/wrapper';
import WrongDirectoryPage from './pages/404/404page';

function App() {
  return (
    <Provider store={appStore()}>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/product" element={<AboutProduct />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/404" element={<WrongDirectoryPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Wrapper>
    </Provider>
  );
}

export default App;
