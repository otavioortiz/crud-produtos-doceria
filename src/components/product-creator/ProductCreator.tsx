import { useNavigate } from "react-router-dom";
import { Product } from "../../model/product";
import { store } from "../../redux/store";
import { addNewProduct } from "../../services/productsService";
import ProductChanger from "../product-changer/ProductChanger";
import './ProductCreator.css';

function ProductCreator() {

    const navigate = useNavigate();

    store.subscribe(() => {
        navigate('/products');
    })
    
    const submitCallback = (product:Product) => {
        addNewProduct(product);
    }

    return (
        <div>
            <ProductChanger product={new Product(0,"",null,false,null,0.00)} submitCallback={submitCallback} tittle={"Criação de produto"}/>
        </div>
    );
  }
  
export default ProductCreator; 
  