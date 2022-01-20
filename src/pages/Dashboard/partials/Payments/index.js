import React,{useEffect, useState} from 'react'
import { logEvents } from '../../../../components/LogEvents';
import PayTo from '../../../../components/PayTo'
import Transactions from '../../../../components/Transactions/Transactions';
import TransactionCard from '../../../../components/Transactions/TransactionCard';
import { ethers } from 'ethers';

function Index(props) {
    const [transfer, setTransfer] = useState("");
    const [txns,setTxns] = useState([]);
    const [data, setData] = useState();
    const [balance ,setBalance] = useState(0);
    const checkShop = async () => {
        try{
          const res =  await window.buzcafeInst.Shops(transfer);
          setData([transfer, ...res]);
          console.log(data);
        }catch(e) {
          console.log(e);
        }
    }

    useEffect(()=>{
      (async () => {

      if(props.address){
        const balance = await ethers.utils.formatEther(
          await window.providerESN.getBalance(props.address)
        );
        setBalance(balance);
        let allTxn = await Promise.all([
            logEvents(window.buzcafeInst,"PayTo",[null,props.address,null,null]),
            logEvents(window.buzcafeInst,"PayTo",[props.address,null,null,null])]);
        
        setTxns(allTxn[0].concat(allTxn[1]).sort(function (a, b) {return b.blockNumber - a.blockNumber;}));
        await console.log("data" , allTxn);
      }
      
    })();
      
    },[props.address])


    return (
        <>
          <div className='payments buzcafe-details' >  
             {props.address ? <div className='row' >
             <div className='col-md-8 mb-4' >
                <h4 className='dashboard__title mb-2' > Current Balance:  </h4> {balance} 
              </div>
              <div className='col-md-6 mb-4' >
                  <h4 className='dashboard__title mb-2' >Make payment</h4> 

                  {data ? <PayTo data={data} /> : 
                  <div className='input__group' >
                    <label>Enter receiver wallet address</label>
                    <input className="input" placeholder='0x00000000000000000000' value={transfer} onChange={e => setTransfer(e.target.value)} type='text' /> 
                    <button className='button button--white' onClick={checkShop} > Proceed </button>  
                  </div>  }

              </div>
              <div className='col-md-8 mb-4' >
                <h4 className='dashboard__title mb-2' > Payments History </h4> 
                {/* <Transactions />    */}
                {txns.map(e => 
                  <TransactionCard
                    mode={e.args[0] == props.address ? "SEND" : "RECEIVE"} 
                    address={e.args[0] == props.address ? e.args[1] : e.args[0]} 
                    value={ethers.utils.formatEther(e.args[2])} 
                    data={e.args[3]}
                    time={"Block Number : " + e.blockNumber}
                    transactionHash= {e.transactionHash}
                  />)}
                    
              </div> 
              
             </div> : <div> Please Connect to wallet</div>}
          </div>   
        </>
    )
}

export default Index
