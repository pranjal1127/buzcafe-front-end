import { UilBitcoinCircle, UilFacebook, UilInstagramAlt, UilLinkedin, UilMediumM, UilRedditAlienAlt, UilTumblrSquare, UilTwitter, UilYoutube } from '@iconscout/react-unicons'
import React from 'react'
import './footer.css'

function Footer() {
    return (
        <>
          <footer className='footer-area' >
             <div className='container' >
            
                <div className='row justify-content-center' >
                   <div className='col-12 col-md-3 col-lg-2 mb-5 mb-lg-0 d-grid' >
                      {/* logo */}
                      <div className='footer-logo' >
                        <img src={process.env.PUBLIC_URL +'/images/buzcafe.png' }/>  
                      </div>
                   </div>

                   <div className='col-12 col-md-9 col-lg-7 mb-5 mb-lg-0' >
                    {/* links */}
                    <div className='footer-links' >
                       <h4 className='mb-2' >Useful Links</h4>

                       <div className='row justify-content-center' >
                          <div className='col-md-4' >
                            <ul>
                                <li><a href='#' >ESN White Paper</a></li>
                                <li><a href='#' >Howey test</a></li>
                                <li><a href='#' >Create wallet</a></li>
                                <li><a href='#' >Accecc my wallet</a></li>
                                <li><a href='#' >User manual</a></li>
                                <li><a href='#' >Era Swap terms & conditions</a></li>
                            </ul> 
                          </div>   
                          <div className='col-md-4' >
                            <ul>
                                <li><a href='#' >Era Swap privacy policy</a></li>
                                <li><a href='#' >Statuary warning</a></li>
                                <li><a href='#' >Era Swap DAO</a></li>
                                <li><a href='#' >Era Swap Token</a></li>
                                <li><a href='#' >Era Swap blockchain Explorer</a></li>
                            </ul> 
                          </div>   
                          <div className='col-md-4' >
                            <ul>
                                <li><a href='#' >View Era Swap Teaser</a></li>
                                <li><a href='#' >Era Swap White paper</a></li>
                                <li><a href='#' >CoinGecko</a></li>
                                <li><a href='#' >CoinMarketCap</a></li>
                            </ul> 
                          </div>   
                       </div>

                    </div>                    
                   </div>         

                   <div className='col-12 col-md-12 col-lg-3 mb-5 mb-lg-0' >
                    {/* social */}
                    <h4 className='mb-2' >Social</h4>
                    <div className='footer-social' >
                        <a className='facebook' href='#' ><UilFacebook /></a>    
                        <a className='linkedin' href='#' ><UilLinkedin /></a>    
                        <a className='twitter' href='#' ><UilTwitter /></a>    
                        <a className='instagram' href='#' ><UilInstagramAlt /></a>    
                        <a className='youtube' href='#' ><UilYoutube /></a>    
                        <a className='bitcoin' href='#' ><UilBitcoinCircle/></a>    
                        <a className='reddit' href='#' ><UilRedditAlienAlt /></a>    
                        <a className='medium' href='#' ><UilMediumM /></a>   
                        <a className='tumblr' href='#' ><UilTumblrSquare /></a>    
                        <a className='' href='#' ><img className='coinmarket' src={process.env.PUBLIC_URL+ './images/icons/coinMarket.png'} alt='' /></a>     
                    </div>
                   </div>
                </div>

             </div>
          </footer>  
        </>
    )
}

export default Footer
