import { UilApps, UilMapPin, UilParcel, UilQrcodeScan, UilSearch, UilShop, UilTimes, UilUser } from '@iconscout/react-unicons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../global.css';
import ConnectWallet from '../../cards/connectWallet';
import WalletsCard from '../../cards/connectWallet';
import './header.css';

function Header() {
   const [navToggle,setNavToggle] = useState(false) 
   const [showWallets,setShowWallets] = useState(false) 

    return (
      <>
         <header className="header" id="header">
            <div className="nav container" >
               
               <Link to="/" className="nav__logo" style={{width:'60px'}} >
                  <img src="./images/buzcafe.png" alt='logo' />
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
                           <input placeholder='search..' className='input' />
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
