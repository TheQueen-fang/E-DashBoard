import React, { useState } from 'react'

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompanyName] = useState('');
  const [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }




    console.log(name, price, category, company);


    const userId = JSON.parse(localStorage.getItem('user'))._id;
    console.log(userId);

    let result = await fetch('http://localhost:5000/addProduct', {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
      
    });
    result = await result.json();
    console.log(result);

    setName('');
    setPrice('');
    setCategory('');
    setCompanyName('');
 }
  return (
    <div className='product'>
      <h1>Add Product</h1>
      
      <input type='text'
         value={name}
        onChange={(e) => {
          setName(e.target.value)
      }}
        placeholder='Enter Product Name' className='inputBox' />
     { error && !name && <span className='invalid-input'>Enter valid name</span>}
     
      <input type='text'
      value={price}
        onChange={(e) => {
          setPrice(e.target.value)
        }}
        placeholder='Enter Product Price' className='inputBox' />
      { error && !price && <span className='invalid-input'>Enter valid Price name</span>}
     
      
      <input type='text'
         value={category}
        onChange={(e) => {
          setCategory(e.target.value)
        }}
        
        placeholder='Enter Product Category' className='inputBox' />
      { error && !category && <span className='invalid-input'>Enter valid category name</span>}
     
      <input type='text'
         value={company}
        onChange={(e) => {
          setCompanyName(e.target.value)
        }}
        
        placeholder='Enter Product Company Name' className='inputBox' />
      { error && !company && <span className='invalid-input'>Enter valid Company name</span>}
    
      <button
        onClick={addProduct}
        className='appButton'>Add Product</button>
      

    </div>
  )
}

export default AddProduct
