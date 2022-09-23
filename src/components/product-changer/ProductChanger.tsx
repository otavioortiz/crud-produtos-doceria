import { Button, Checkbox, FormControlLabel, Stack } from '@mui/material';
import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import { Product } from '../../model/product';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './ProductChanger.css';
import { MoneyInput } from '../utils/MoneyInput';
import { useNavigate } from 'react-router-dom';

function ProductChanger(props:any) {

  const navigate = useNavigate();
  const tittle:string = props.tittle;
  const currentProduct:Product = props.product;
  const submitCallback = props.submitCallback;

  const [textError, setTextError] = React.useState("")
  const [formValues, setFormValues] = React.useState({
    productName: currentProduct.name,
    manufacture: currentProduct.manufacture,
    perishable: currentProduct.perishable,
    validity: currentProduct.validity,
    price: currentProduct.price
  });

  const changeValue = (e:any) => {
    const {name, value} = e.target;

    if(name == "productName")
      setFormValues({...formValues, [name]: value});

    if(name == "perishable"){
      const isPerishable = !formValues.perishable
      setFormValues({...formValues, [name]: isPerishable});
    }
  }

  const changeDate = (e:any) => {
    const name = e.name;
    setFormValues({...formValues, [name]: e.date});
  }

  const changePrice = (e:any) => {
    setFormValues({...formValues, ["price"]: e.floatValue});
  }

  const getUpdatedProduct = (product:Product) => {
    let {id, name, manufacture, perishable, validity, price} = product;

    name = formValues.productName;
    manufacture = formValues.manufacture;
    perishable = formValues.perishable;
    validity = null;
    
    if(perishable)
      validity = formValues.validity;
    
    price = formValues.price;
    const updatedProduct = new Product(id, name, manufacture, perishable, validity, price);

    return updatedProduct;
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    let existsError = false;

    setTextError("");

    if( formValues.price == null ){
      setTextError("O Campo PREÇO não pode ser vazio");
      existsError = true;
    }

    if(formValues.perishable){
      if(formValues.validity == null){
        setTextError("Se o produto é perecível precisa de uma data de validade");
        existsError = true;
      }
        
      else{
        if(formValues.manufacture != null && formValues.manufacture != "" ){
          const manufactureDate = new Date(formValues.manufacture);
          const validityDate = new Date(formValues.validity);

          if(manufactureDate > validityDate){
            setTextError("A data de fabricação não pode ser maior que a data de validade");
            existsError = true;
          }
        }
      }
    }

    if(formValues.manufacture == null || formValues.manufacture == "" ){
      setTextError("O produto precisa de uma data de fabricação");
      existsError = true;
    }

    if( formValues.productName.length < 1 ){
      setTextError("O Campo NOME não pode ser vazio");
      existsError = true;
    }

    if(!existsError){
        submitCallback(getUpdatedProduct(currentProduct));
    }
  }
  
  return (

      <div className="box">
          
          <form onSubmit={handleSubmit}>

            <h3 className="tittle">{tittle}</h3>
          
            <TextField name="productName" label="Nome" onChange={changeValue} defaultValue={formValues.productName}/>

            <LocalizationProvider name="manufacture" required dateAdapter={AdapterDayjs}>
                <Stack spacing={1}>
                    <DesktopDatePicker
                    value={formValues.manufacture}
                    label="Data de fabricação"
                    inputFormat="DD/MM/YYYY"
                    onChange={(date) => changeDate({date: date, name: "manufacture"}) }
                    renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider>

            <FormControlLabel name="perishable" id="perishable-label" control={<Checkbox checked={formValues.perishable} onChange={changeValue} />} label="Perecível"/>

            {formValues.perishable ? <LocalizationProvider name="validity" required dateAdapter={AdapterDayjs}>
                <Stack spacing={1}>
                    <DesktopDatePicker
                    value={formValues.validity}
                    label="Data de validade"
                    inputFormat="DD/MM/YYYY"
                    onChange={(date) => changeDate({date: date, name: "validity"})}
                    renderInput={(params) => <TextField {...params} />}
                    />
                </Stack>
            </LocalizationProvider> 
              : <LocalizationProvider name="validity" required dateAdapter={AdapterDayjs}>
              <Stack spacing={1}>
                  <DesktopDatePicker
                  value={formValues.validity}
                  label="Data de validade"
                  inputFormat="DD/MM/YYYY"
                  onChange={(date) => changeDate({date: date, name: "validity"})}
                  disabled
                  renderInput={(params) => <TextField {...params} />}
                  />
              </Stack>
            </LocalizationProvider> }

            <MoneyInput name="price" onPriceChange={changePrice} startValue={formValues.price}/>

            <p id="errorMessage">{textError}</p>

            <Button variant="contained" onClick={() => navigate('/products')}>Cancelar</Button>
            <Button variant="contained" type="submit">Salvar</Button>

          </form>
      </div>
  );
}
  
export default ProductChanger; 