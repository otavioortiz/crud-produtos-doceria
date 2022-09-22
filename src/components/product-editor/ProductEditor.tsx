import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Product } from '../../model/product';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import './ProductEditor.css';
import { MoneyInput } from '../utils/MoneyInput';
import { editProduct } from '../../services/productsService';
import { store } from '../../redux/store';
import ProductChanger from '../product-changer/ProductChanger';


function ProductEditor() {

  const location = useLocation();
  const currentProduct:Product = location.state.product;

  const navigate = useNavigate();

  store.subscribe(() => {
    navigate('/products');
  })

  const submitCallback = (product:Product) => {
    editProduct(product);
  }
      
  return (
    <div>
      <ProductChanger product={currentProduct} submitCallback={submitCallback} tittle={"Edição de produto"}/>
    </div>
  );
}
  
export default ProductEditor; 