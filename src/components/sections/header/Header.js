import { UilApps, UilMapPin, UilParcel, UilQrcodeScan, UilSearch, UilShop, UilTimes, UilUser } from '@iconscout/react-unicons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../global.css';
import ConnectWallet from '../../cards/connectWallet';
import WalletsCard from '../../cards/connectWallet';
import './header.css';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

const truncate = (data) =>`${data.slice(0, 10)}....${data.slice(38)}`;


function Header() {
   const [navToggle,setNavToggle] = useState(false) 
   const [showWallets,setShowWallets] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [options, setOptions] = useState([]);
   const handleSearch = (query) => {
      setIsLoading(true);
      window.kycdappInst.resolveAddress(window._ethers.utils.formatBytes32String(query))
      .then(res => {
         if(res != '0x0000000000000000000000000000000000000000')setOptions([{user : query, address : res}]);
         console.log(options);
         setIsLoading(false);
      })
    };
    return (
      <>
         <header className="header" id="header">
            <div className="nav container" >
               
               <Link to="/" className="nav__logo" style={{width:'60px'}} >
                  <img src={process.env.PUBLIC_URL +  "/images/buzcafe.png"} alt='logo' />
               </Link>

               <div className={`nav__menu ${navToggle ? 'show__menu' : ''}`} id="nav__menu" >
                  <ul className="nav__list grid" >
                     <li className="nav__item" > 
                        <Link to="/scan" className="nav__link" >
                           <UilQrcodeScan className="nav__icon" /> Scan & Pay  
                        </Link>
                     </li> 

                     <li className="nav__item" > 
                        <Link to="/near-me" className="nav__link" >
                          <UilMapPin className="nav__icon" /> Near Me 
                        </Link>
                     </li>

                     <li className="nav__item" > 
                        <Link to="/dashboard#business-details" className="nav__link" >
                          <UilShop className="nav__icon" /> List My Business  
                        </Link>
                     </li> 

                     <li className="nav__item" > 
                        <Link to="/dashboard#your-shop" className="nav__link" >
                          <UilParcel  className="nav__icon" /> Dashboard
                        </Link>
                     </li> 
                  </ul> 

                  <div className='d-flex' >
                     <div className='nav__partial' >
                     <div className='input__field' >
                           <UilSearch/>
                           {/* <input placeholder='search..' className='input' /> */}

                           <AsyncTypeahead
                              id="async-example"
                              isLoading={isLoading}
                              labelKey="user"
                              minLength={2}
                              onSearch={handleSearch}
                              options={options}
                              placeholder="Search by user name"
                              renderMenuItemChildren={(option) => (
                                 <Link className='card-link' to={`/shop/${option.address}`}>
                                    <p className='m-0'>{option.user}</p>
                                    <span className='m-0'>{truncate(option.address)}</span>
                                 </Link>
                              )}  
                           />
                     </div>
                        
                        <a className='button button--flex btn outline-light'  >
                          <ConnectWallet />
                        </a>
                     </div>   

                     <i className="nav__close" id="nav__close" onClick={() => setNavToggle(false)} ><UilTimes/></i>
                  </div>
               </div>

               <div className="nav__btns" >
                  <div className="nav__toggle" id="nav__toggle" onClick={() => setNavToggle(!navToggle)} >
                     <UilApps/>
                  </div>
               </div>
               
            </div>  

            {showWallets && <WalletsCard setShowWallets={setShowWallets} />}
         </header>  
      </>
   )
}

export default Header
