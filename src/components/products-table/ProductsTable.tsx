import { Button} from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../model/product';
import { store } from '../../redux/store';
import { addNewProduct, loadProducts } from '../../services/productsService';
import './ProductsTable.css';


const rows = Array<Product>();

export default function ProductsTable() {
  
  const [products, setProducts] = useState(rows);

  if(products.length == 0)
    loadProducts();

  store.subscribe(() => {
      setProducts(store.getState().product.products)
  })

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Produto', width: 190 },
    { 
      field: 'manufacture', 
      headerName: 'Fabricação', 
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        if(params.row.manufacture){
          const manufactureDate = new Date(params.row.manufacture);
          return manufactureDate.toLocaleDateString();
        }
      }, 
    },
    {
      field: 'perishable',
      headerName: 'Perecível',
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        if(params.row.perishable)
          return "sim";
        return "não";
      },
    },
    {
      field: 'validity',
      headerName: 'Validade',
      width: 120,
      valueGetter: (params: GridValueGetterParams) => {
        if(params.row.validity){
          const validityDate = new Date(params.row.validity);
          return validityDate.toLocaleDateString();
        }
      }, 
    },
    {
      field: 'price',
      headerName: 'Preço',
      valueGetter: (params: GridValueGetterParams) => {
        const price:number = params.row.price;
        const priceStr = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2});

        return priceStr;
      }, 
      width: 90,
    },
    {
      field: 'edit',
      headerName: 'Editar',
      width: 90,
      renderCell: (values) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={(event) => {
              const clickedProduct:Product = products.filter( product => product.id == values.id)[0];
              navigate(`/edit-product`, {state: {product: clickedProduct}});
            }}
          >
            Editar
          </Button>
        );
      }
    },
  ]; 
  
  return (
    <div className="products-table">
      <div style={{ height: 650, width: 800 }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      </div>
      <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            
            navigate('/add-product');
          }}>
          Adicionar novo produto
        </Button>
    </div>
  );
}
