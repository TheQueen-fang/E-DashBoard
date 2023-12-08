import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom';
const UpdateProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompanyName] = useState('');
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    //param brings id from url
    console.log(params);
    getProductDetails();
  },[]);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {

      
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompanyName(result.company);
  }

  const updateProduct = async () => {
    
console.log(name, price, category, company);

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({
        name, price, category, company
        
      }),

      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    console.log(result);
    navigate('/');

 }
  return (
    <div className='product'>
      <h1>Update Product</h1>
      
      <input type='text'
         value={name}
        onChange={(e) => {
          setName(e.target.value)
      }}
        placeholder='Enter Product Name' className='inputBox' />
     
     
      <input type='text'
      value={price}
        onChange={(e) => {
          setPrice(e.target.value)
        }}
        placeholder='Enter Product Price' className='inputBox' />
      
     
      
      <input type='text'
         value={category}
        onChange={(e) => {
          setCategory(e.target.value)
        }}
        
        placeholder='Enter Product Category' className='inputBox' />
      
     
      <input type='text'
         value={company}
        onChange={(e) => {
          setCompanyName(e.target.value)
        }}
        
        placeholder='Enter Product Company Name' className='inputBox' />
     
    
      <button
        onClick={updateProduct}
        className='appButton'>Update Product</button>
      

    </div>
  )
}

export default UpdateProduct
