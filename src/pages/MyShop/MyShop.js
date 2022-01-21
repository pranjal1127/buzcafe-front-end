import React, { useEffect, useState } from 'react';
import {ethers} from 'ethers';
import { useParams } from "react-router-dom";
import Transactions from '../../components/Transactions/Transactions';
import kycl1 from './kyc-level-1.png'
import kycl2 from './kyc-level-2.png'
import { logEvents } from '../../components/LogEvents';
import TransactionCard from '../../components/Transactions/TransactionCard';
import PayTo from '../../components/PayTo';


function MyShop(){

    const { address } = useParams();
    const [user, setUser] = useState("");
    const [spin, setSpin] = useState(true);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(false);
    const [isLevel1, setLevel1] = useState(false);
    const [isLevel2, setLevel2] = useState(false);
    const [txns,setTxns] = useState([]);


    const fetchDetails = async () => {
        const res = await window.buzcafeInst.Shops(address);
        setDetails(res);
        const level1 = await window.kycdappInst.isKycLevel1(address);
        setLevel1(level1)
        if(details && details[0]){
          console.log(address,2,ethers.utils.formatBytes32String("BUZCAFE"),details[0])
          const level2 = await window.kycdappInst.isKycApproved(address,2,ethers.utils.formatBytes32String("BUZCAFE"),details[0]);
          console.log(level2);
          setLevel2(level2)
        }
    }
    const fetchTransactions = async () => {
      let allTxn = await Promise.all([
        logEvents(window.buzcafeInst,"PayTo",[address,null,null,null]),
        logEvents(window.buzcafeInst,"PayTo",[null,address,null,null])]);
      setTxns(allTxn[0].concat(allTxn[1]).sort(function (a, b) {return b.blockNumber - a.blockNumber;}));
    }

    useEffect(() => {
      const intervalId = setInterval(async () => {
        if (window.wallet) {
          setUser(window.address);
          await fetchTransactions();
          clearInterval(intervalId);
        } 
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };


    }, []);

    
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
      }, [address]);


    return (
        <div  className='dashboard container' >
            {/* <Hero /> */}
            <br/>
            <br/>
            <br/>
            <br/>

            <br/>
            <br/>
            <br/>
            {spin ?<div className="loader mx-auto">Loading...</div> :
              error || details.length != 5 || ethers.utils.parseBytes32String(details[0])=="" ? <div className='text-center'>Shop Not Found </div> :
              <>
            <div className="card shadow">
                
                <div className="row p-5">
                    <div className="col-md-4">
                    <img src={details[4]} className="w-100" />
                    </div>
                    <div className="col-md-8 px-3">
                    <a href="#" class="badge badge-info">{ethers.utils.parseBytes32String(details[0])}</a>
                    {isLevel2 && <img alt="kyc2" align="right" src={kycl2} width="60px" className="text-right"/>}
                    {isLevel1 && <img alt="kyc1" align="right" src={kycl1} width="60px" className="text-right "/>}
                    <div className="card-block px-3">
                        <h4 className="card-title">{details[2]}</h4>
                        <div className='text-muted'>{address}</div>
                        
                              
                        <p className='card-text'>
                         <i class="fa fa-map-marker" aria-hidden="true"></i> {details[1]}
                        </p>
                        <p className='card-text'>
                         <i class="fa fa-phone-alt" aria-hidden="true"></i> {details[3]}
                        </p>
                    </div>
                    </div>
                </div>
            </div>
           <br/> <br />
           <PayTo address={address} data={[address,...details]} />
           <br/> <br />
           <h4 className='dashboard__title mb-2' > Your Transactions </h4> 
            {user=='' ? <div className='text-center'>Please Connect to wallet</div> : null}
            {!txns.length ? <div className='text-center'>{"Seems you don't have ay transactions"}</div>:null }
           {txns.map(e => 
              <TransactionCard
                mode={e.args[0] == user ? "SEND" : "RECEIVE"} 
                address={e.args[0] == user ? e.args[1] : e.args[0]} 
                value={ethers.utils.formatEther(e.args[2])} 
                data={e.args[3]}
                time={"Block Number : " + e.blockNumber}
                transactionHash= {e.transactionHash}
              />)}
            </>}
            <br/>
            <br/>
            <br/>
            <br/>

        </div>
    )
}

export default MyShop;