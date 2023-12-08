import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);
  const deleteProduct =async(id) => {
    console.log(id);

    let result =  await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
      
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = result.json();
    if (result) {
      getProducts();
    } else {
      
    }
  };

  const getProducts = async() => {
    let result = await fetch('http://localhost:5000/products', {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
    console.log('product');
    console.log(products);
  }
  const searchHandle = async(e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
    result = await result.json();
      if (result) {
        console.log('resukt');
        console.log(result);
      setProducts(result);
    }
    } else {
      getProducts();
    }
   
}
  return (
    <div className='product-list'>
      <h3>Product List</h3>

      <input type='text' placeholder='Search Product' className='search-product-box'
      
      onChange={searchHandle}/>
      <ul>
        <li>S.NO</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
        
       products.length>0? products.map((item, idx) => 
          
          <ul key={item._id}>
           
            <li>{
             idx+1
              }</li>
            <li>{ item.name}</li>
            <li>${ item.price}</li>
            <li>{item.category}</li>
            
            <li><button onClick={() => {
              deleteProduct(item._id)
            }}>Delete</button>
            
            <Link to={'/update/'+item._id}>Update</Link>
            </li>
          </ul>
        ) :
         <h1>No Product Found!</h1> 
      }
    </div>
  )
}
export default ProductList;