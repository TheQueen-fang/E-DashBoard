import React, { useState,useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const auth = localStorage.getItem('user');

    if (auth) {
      navigate('/');
      }
  })

  const collectData = async () => {
    console.log("inside Collect Data");
   let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify(
        {
          name, email, password
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      },

   });
    console.log("result: "+ result);
    result = await result.json();
    
    localStorage.setItem('user', JSON.stringify(result.result));

    localStorage.setItem('token', JSON.stringify(result.auth));
    
    if (result) {
      navigate('/');
    }
  }
  return (
    <div className='register'>
      <h1>Register</h1>
      <input type='text'
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
        placeholder='Enter Name' className='inputBox' />
      
      <input type='text'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        
        placeholder='Enter Email' className='inputBox' />
      <input type='password'
      value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        
        placeholder='Enter Password' className='inputBox' />
      
      <button className='appButton' onClick={collectData}>Sign Up</button>
    </div>
  )
}

export default SignUp
