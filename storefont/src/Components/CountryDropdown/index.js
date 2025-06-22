import { FaAngleDown } from "react-icons/fa";
import Button from '@mui/material/Button';

const CountryDropdown =  ()=>{
    return(
        <>
            <Button className='countryDropdown'>
                <div className='info d-flex flex-column'>
                    <span className="label">Your Location</span>
                    <span className="name">India</span>
                </div>
                <span className="ml-auto"><FaAngleDown /></span>
            </Button>
        </>
    )
}

export default CountryDropdown;