import React, { useState, useContext  } from 'react';
import { CredentialsContext } from '../App';
import { useHistory } from 'react-router-dom';
import Form from "../styles/Form";
import { Link } from 'react-router-dom';

const hanleErrors = async (response) => {
  if (! response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

export default function Register(){
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [, setCredentials] = useContext(CredentialsContext);
    const history = useHistory('');
    const [ error, setError ] = useState('');
  
    const register = (e) => {
      e.preventDefault();
      fetch('/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })
      .then(hanleErrors)
      .then(()=>{
        setCredentials({
            username,
            password
          })
        history.push('/')  
       })
      .catch((error)=>{
        setError(error.message)
      }) 
    };
  
    return(
      <div>        
      <Form>
        <h1 className="text-center text-info">Register</h1>
        {error && <span style={{color: 'red'}}>{error}</span>}
        <div className="form-group">
          <input
            placeholder="Username"
            onChange={(e)=>setUsername(e.target.value)}
            className="form-control"
          />
          <br /><br />
          <input
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            className="form-control"
          />  
          <br /><br />
        </div>

        <div className="d-flex justify-content-between align-item-end">
          <button type="submit" onClick={register} className="btn-info btn-md">Submit</button>
          <Link to="/login">I am already register</Link>
        </div>
        
      </Form>
      </div>
    );
  };