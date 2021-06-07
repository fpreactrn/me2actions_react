import React, { useContext } from 'react';
import { CredentialsContext } from '../App';

export default function Actions(){
  const [credentials, setCredentials] = useContext(CredentialsContext);

  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
      <h2>I am Actions component</h2>
      {credentials &&
        <button onClick={logout}>Logout</button>
      }      
    </div>
  );
};