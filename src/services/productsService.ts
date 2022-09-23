import { Product } from "../model/product";
import { updateAddProduct, updateEditProduct, updateProducts, updateRemoveProduct } from "../redux/productSlice";
import { store } from "../redux/store";

const LOCAL_API_URL = "http://localhost:3001/";

function getToken(){
  const token = localStorage.getItem('token');
  return token;
}

export async function loadProducts(){
    fetch(LOCAL_API_URL + "products").then(res => res.json()).then(result => {
        store.dispatch(updateProducts(result));
      }
    );
}

export async function addNewProduct(product:Product){
  const {id,name, manufacture, perishable, validity, price} = product;
  const newProduct = {name, manufacture, perishable, validity, price};

  

  fetch(LOCAL_API_URL + "products", {
    method:"POST",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(newProduct)
  }).then(res => res.json()).then(result => {
        store.dispatch(updateProducts(result));
      }
    );
}

export async function editProduct(product:Product){
  fetch(LOCAL_API_URL + "products/" + product.id, {
    method:"PUT",
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(product)
  }).then(res => res.json()).then(result => {
        store.dispatch(updateProducts(result));
      }
    );
}
