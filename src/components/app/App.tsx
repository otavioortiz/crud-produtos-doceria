import React from 'react';
import Login from '../login/Login';
import {Route, Routes, BrowserRouter,} from "react-router-dom";
import './App.css';
import ProductsTable from '../products-table/ProductsTable';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import ProductCreator from '../product-creator/ProductCreator';
import ProductEditor from '../product-editor/ProductEditor';

const App = () => {
    return (       
      <Provider store={store}>
        <header className="app-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/products" element={<ProtectedRoute><ProductsTable/></ProtectedRoute>} />
              <Route path="/add-product" element={<ProtectedRoute><ProductCreator/></ProtectedRoute>} />
              <Route path="/edit-product" element={<ProtectedRoute><ProductEditor/></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </header>
      </Provider>
    );
  }
  export default App;