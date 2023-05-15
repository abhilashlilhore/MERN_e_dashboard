import React from 'react';


import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const ss = useNavigate();
    const logoutthis = () => {
        localStorage.clear();

        ss('/signup');

    }
    // console.log(JSON.parse(auth).result.name);

    // alert(JSON.parse(auth).name);

    return (
        <div>


            {auth ? <ul className='nav-ul'>
                
                <li><img src='https://code.google.com/images/developers.png' alt='img' className='logonew'/></li>
                <li><Link to="/product">Produc</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logoutthis} to="/signup">Logout ({JSON.parse(auth).result.name}) </Link></li>

            </ul>
                : <ul className='nav-ul nav-ul2'>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/test">Test</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;
