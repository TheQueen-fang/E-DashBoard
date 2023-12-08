import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  },[])
  async function handleLogin() {
    let result = await fetch('http://localhost:5000/login', {
      method: 'post',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log('result : ' + result);
    console.log(result);
    if (result.auth) {
      localStorage.setItem('user', JSON.stringify(result.user));

      localStorage.setItem('token', JSON.stringify(result.auth));

      navigate('/');
    } else {
      alert('Plzz Enter Correct Email and Password');
    }
}
  return (
    <div className='login'>
      <input type='text' placeholder='enter email' className='inputBox'
      value={email}
        onChange={(e) => {
       setEmail(e.target.value);
      }}/>
      
      <input type='password' placeholder='enter password' className='inputBox'
        value={password}
        onChange={(e) => {
        setPassword(e.target.value);
      }}/>
      
      <button onClick={handleLogin}className='appButton'>Login</button>
    </div>
  )
}

export default Login;
