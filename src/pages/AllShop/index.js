import React,{useState,useEffect} from 'react'
import TopShopCard from '../../components/cards/TopShopCard'
import Hero from '../../components/sections/Hero'
import './allShop.css'
import {ethers} from 'ethers';
import { Link, useParams } from "react-router-dom";
import { logEvents } from '../../components/LogEvents';
import { CATEGORY } from '../../Constant';

function AllShop() {
  const {category} = useParams();
  const [spin, setSpin] = useState(true);
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(false);
  // console.log("category :", category);
  const fetchDetails = async () => {
    let data = [];
    if(category) data = await logEvents(window.buzcafeInst,"AddShop",[null,ethers.utils.formatBytes32String(category)])
    else  data = await logEvents(window.buzcafeInst,"AddShop",[null,null])

    const detailsAll = await Promise.all(
      data.map(async (ele) => {
        const shop = await window.buzcafeInst.Shops(ele.args[0]);
        return [ele.args[0],...shop];
      })
    );
    console.log(detailsAll);
    setDetails(detailsAll);

  }

  useEffect(() => {
    (async () => {
      try {
        setSpin(true);
        await fetchDetails();
      } catch (e) {
        // setExist(false);
        console.log("Error", e);

        setError(true);
      }
      setSpin(false);
    })();
  }, [category]);


    return (
        <> 
          <Hero/> 
          <section className='all-shop px-2 px-md-4' >
              <div className='section__title-field container' >
                <h3 className='section__title' >Shop Categories</h3>
              </div>     
                      
              <div className='section__content mt-5' >
                 
                <div className='row' >

                  <div className='col-md-2' >
                      <div className='' >
                        <ul className="list-group list-group-flush">
                        {CATEGORY.map(ele => <li className='list-group-item'><Link to={"/all-shop/"+ele}>{ele}</Link></li>)}
                          
                        </ul>
                      </div>
                  </div>
                 {spin ?<div className="loader mx-auto">Loading...</div> :

                  <div className='col-md-10' >  
                    <div className='row' >
                      {!details.length ? <div className='text-center'>No shops are there </div> : null}

                      {details.map(ele => <Link to={"/shop/"+ele[0]} className='col-md-4 mb-3' >
                         <TopShopCard src={ele[5]} name={ele[3]} rating={5} />
                       </Link>)}

                       
                    </div>  
                  </div>}

                </div> 

              </div>        
          </section>   
        </>
    )
}

export default AllShop;
