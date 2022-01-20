import React from 'react'
import TopShopCard from '../../components/cards/TopShopCard'
import Hero from '../../components/sections/Hero'
import './nearMe.css'

function index() {
    return (
        <> 
          <Hero/> 
          <section className='all-near px-2 px-md-4' >
            <div className='container' >

              <div className='section__title-field' >
                <h3 className='section__title' > Shops near me </h3>
              </div>     
                      
              <div className='section__content mt-5' >
                Comming Soon 
                {/* <div className='row' >
                  
                  <div className='col-md-4 mb-4' >
                     <TopShopCard src='./images/top-shop/shopping-2.jpg' name='Shop Name 1' rating={5} />
                  </div>     
                  <div className='col-md-4 mb-4' >
                     <TopShopCard src='./images/top-shop/shopping-2.jpg' name='Shop Name 1' rating={5} />
                  </div>     
                  <div className='col-md-4 mb-4' >
                     <TopShopCard src='./images/top-shop/shopping-2.jpg' name='Shop Name 1' rating={5} />
                  </div>     
                  
                  <div className='col-md-4 mb-4' >
                     <TopShopCard src='./images/top-shop/shopping-2.jpg' name='Shop Name 1' rating={5} />
                  </div>     
                  <div className='col-md-4 mb-4' >
                     <TopShopCard src='./images/top-shop/shopping-2.jpg' name='Shop Name 1' rating={5} />
                  </div>     
                  <div className='col-md-4 mb-4' >
                     <TopShopCard src='./images/top-shop/shopping-2.jpg' name='Shop Name 1' rating={5} />
                  </div>     

                </div>  */}
              </div>  

            </div>      
          </section>   
        </>
    )
}

export default index
