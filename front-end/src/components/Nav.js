import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();
  const logout = () => {

    localStorage.clear();
    navigate('/signup');
}
  return (
    <div>
      <img src='https://th.bing.com/th/id/OIP.NlU7U0-N6nOLaZvMNubjFwHaHa?rs=1&pid=ImgDetMain' alt='logo' className='logo'/>
      {/* <ul className='nav-ul'>
        <li>
          <Link to='/'>Products</Link></li>
         <li> <Link to='/add'> Add Products</Link></li>
        <li><Link to='/update'>Update Products</Link></li>
        {/* <li><Link to='/logout'>Logout</Link></li>
        <li> */}
        {/* <li> 
          <Link to='/profile'>Profile</Link></li>
        
        {
          auth ? <li><Link onClick={logout} to='/signup'>Logout</Link></li> : <>
            <li><Link to='/signup'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </>

        } */}

        {/* <li>{ auth?<Link onClick={logout}  to='/signup'>Logout</Link>:<Link to='/signup'>Register</Link>}</li>
        
        <li><Link to='/login'>Login</Link></li> */}
      {/* </ul> */} 

      {
        auth ? <ul className='nav-ul'>
          <li><Link to='/'>Products</Link></li>
          <li><Link to='/add'>Add Products</Link></li>
          <li><Link to='/update'>Update Product</Link></li>
          <li><Link to='/profile'>Profile</Link></li>
          <li><Link onClick={logout} to='/signup'>Logout ({ JSON.parse(auth).name})</Link></li>
          
        </ul>
          :
          <ul className='nav-ul nav-right'>
            <li><Link to='/signup'>Sign Up</Link></li>
            <li><Link to='/login'>Login</Link></li>
          </ul>
      }
    </div>
  )
}
export default Nav;