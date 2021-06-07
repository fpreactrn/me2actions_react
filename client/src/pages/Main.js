import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Actions from '../components/Actions';
import { CredentialsContext } from '../App';

export default function Main(){
  const [ credentials ] = useContext(CredentialsContext);

  return(
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
          <div className="card">
            <div className="card-header">
              <h1>Action Item List</h1>
            </div>
            <div className="card-body">              
              {!credentials &&
                <div>
                  <Link to="/register">Register</Link>
                </div>
                
              }
              <br />
              {!credentials &&
                <div>
                  <Link to="/login">Login</Link>
                </div>        
              }
            </div>
            <div className="card-footer">
              {credentials &&
                <Actions />
              }  
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
};