import React, { ChangeEvent, useState } from 'react';
import './Login.css';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { loginEnter, loginError } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
import { verifyCredentials } from '../../services/authService';

function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  store.subscribe(() => {
    setErrorMessage(store.getState().login.errorMessage);
    if(store.getState().login.isLogged == true)
      navigate('/products');
  })

  const dispatch = useDispatch()

  function onChangeUserName(e:ChangeEvent<HTMLInputElement>){
    setUserName(e.currentTarget.value)
  }
  
  function onChangePassword(e:ChangeEvent<HTMLInputElement>){
    setPassword(e.currentTarget.value)
  }
  
  function onClickEnter(){
    if( verifyCredentials(userName, password) )
      dispatch(loginEnter());
    else
      dispatch(loginError());
  }

  return (
      <header className="login-header">
        <div className="box">
          <div className="login-message">
          Digite seu usuário e senha
          </div>

          <TextField
              required
              id="user-name"
              label="Usuário"
              defaultValue=""
              onChange={onChangeUserName}
            />

          <TextField
              required
              id="user-password"
              label="Senha"
              defaultValue=""
              onChange={onChangePassword}
            />

          <div className="login-error">
            {errorMessage}
          </div>

            <Button variant="contained" onClick={onClickEnter}>Entrar</Button>
        </div>
        
      </header>

  );
}

export default Login; 
