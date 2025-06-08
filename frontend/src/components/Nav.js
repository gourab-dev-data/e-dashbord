import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    let authName = '';
    if(auth){
        authName = JSON.parse(auth).name;
    }    
    const navigate = useNavigate();
    const logout = () => {
        //console.log('logout');
        localStorage.clear();
        navigate('/signup');
    }
    return (
        <div className="header" >
            <div className="logoBox">
                <img src={process.env.PUBLIC_URL + '/logo512.png'} alt="" className="logo" />
            </div>
            <div className="left-menu">
                {auth ?
                    <ul className="nav-ul">
                        <li>
                            <Link to="/">Products</Link>
                        </li>
                        <li>
                            <Link to="/add">Add Product</Link>
                        </li>
                        <li>
                            <Link to="/update">update Product</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>

                    </ul>
                    : ''
                }
            </div>
            <div className="right-menu">
                <ul className="nav-ul right-nav">
                    {
                        auth ? <li><Link onClick={logout} to="/signup">Logout ({authName})</Link></li>
                            :
                            <>
                                <li><Link to="/signup">Sign up</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>
                    }
                </ul>
            </div>
        </div >
    )
}

export default Nav;