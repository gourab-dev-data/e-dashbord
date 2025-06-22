import { Link } from 'react-router-dom';
import Logo from '../../assets/images/ecommerce-logo.png';
import CountryDropdown from '../CountryDropdown';
import Button from '@mui/material/Button';
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";


const Header =  ()=>{
    return(
        <>
        <header className="headerWrapper">
            <div className="top-strip bg-purple">
                <div className="container">
                    <p className="mb-0 mt-0 text-center">
                        Due to the <b>COVID 19</b> epidemic, Orders may be processed with a slight delay
                    </p>
                </div>
            </div>
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="logoWrapper d-flex align-item-center col-sm-2">
                            <Link to={"/"}> <img src={Logo} alt='logo' /></Link>
                        </div>
                        <div className='d-flex align-items-center col-sm-10 part2'>
                            <CountryDropdown />

                            {/* Header search start here */}
                                <div className='headerSearch ml-3 mr-3'>
                                    <input type='text' placeholder='Search for products...' />
                                    <Button><IoMdSearch /></Button>
                                </div>
                            {/* Header search end  here */}

                            <div className='d-flex align-items-center part3 ml-auto'>
                                <Button className='circle mr-3'><FaUser /></Button>

                                <div className='ml-auto cartTab d-flex align-items-center'>
                                    <span className='price'>$32.50</span>
                                    <div className='position-relative ml-2'>
                                        <Button className='circle ml-2'><FaShoppingCart /></Button>
                                        <span className='count d-flex align-items-center justify-content-center'>1</span>
                                    </div>                                    
                                </div>


                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header;