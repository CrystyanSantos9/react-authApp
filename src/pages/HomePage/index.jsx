import React, {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../contexts/auth';

import { getUsers, api } from '../../services/api';

function HomePage() {
  const {logout } =useContext(AuthContext);
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState([])

  useEffect(()=>{
    ( async ()=>{
      const response = await getUsers()
      console.log(response)
      setUsers(response.data)
      setLoading(false)
    })()
  },[])

  const handleLogout = () => {
    logout()
  }

  if(loading){
    return <div className='loading'>Carregando dados...</div>
  }

  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        {users.map((user)=>{
        return (
        <li key={user.id}>
          {user.id} - {user.name} -  {user.email}
        </li>)
        })}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  );
}

export default HomePage;